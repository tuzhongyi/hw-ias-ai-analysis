import { EventEmitter, Injectable } from '@angular/core';
import { MobileEventRecord } from '../../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ShopRegistration } from '../../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { ConvertTool } from '../../../../../../../../common/tools/convert-tool/convert.tool';
import { LanguageTool } from '../../../../../../../../common/tools/language-tool/language.tool';
import { wait } from '../../../../../../../../common/tools/wait';
import { SystemEventManagerShopWindow } from '../../system-event-manager-shop.window';

@Injectable()
export class SystemEventManagerShopProcessSignDiscoverController {
  event = {
    marking: new EventEmitter<string>(),
    merge: new EventEmitter<{
      eventId: string;
      shopId: string;
      subname: boolean;
      name?: string;
    }>(),
    create: new EventEmitter<{
      eventId: string;
      shopId: string;
      subname: boolean;
    }>(),
  };

  load = new EventEmitter<void>();
  points: ShopRegistration[] = [];

  constructor(
    private window: SystemEventManagerShopWindow,
    private language: LanguageTool
  ) {}

  on = {
    loaded: (datas: ShopRegistration[]) => {
      this.points = datas;
    },
    create: (data: MobileEventRecord) => {
      let shop = ConvertTool.event.record.registration(data);
      this.window.shop.data = shop;
      this.window.shop.show = true;
    },
    edit: (data: ShopRegistration) => {
      this.window.edit.name.data = data;
      this.window.edit.name.show = true;
    },
    merge: (data: {
      name?: string;
      subname: boolean;
      detected: ShopRegistration;
      data: MobileEventRecord;
    }) => {
      this.window.confirm.clear();
      this.window.confirm.message = `是否与商铺 <span class="name">${data.detected.Name}</span> <span class="discover">关联</span>？`;
      this.window.confirm.show = true;

      wait(() => {
        return !(this.window.confirm.result === undefined);
      }).then(() => {
        if (this.window.confirm.result) {
          this.event.merge.emit({
            eventId: data.data.Id,
            shopId: data.detected.Id,
            subname: data.subname,
            name: data.name,
          });
        }
      });
    },
    marking: (data: MobileEventRecord) => {
      this.window.confirm.clear();
      if (data.Resources && data.Resources.length > 0) {
        let resource = data.Resources[0];
        this.window.confirm.message = `是否<span class="misinfo">屏蔽</span> <span class="name">${resource.ResourceName}</span> ？`;
        this.window.confirm.show = true;

        wait(() => {
          return !(this.window.confirm.result === undefined);
        }).then(() => {
          if (this.window.confirm.result) {
            this.event.marking.emit(data.Id);
          }
        });
      }
    },

    shop: {
      create: () => {
        this.load.emit();
        this.window.shop.show = false;
      },
      edit: () => {
        this.load.emit();
        this.window.edit.name.show = false;
      },
    },
  };
  close() {
    this.window.process.sign.discover.show = false;
  }
  open(data: MobileEventRecord) {
    this.window.process.sign.discover.data = data;
    this.window.process.sign.discover.show = true;
  }
}
