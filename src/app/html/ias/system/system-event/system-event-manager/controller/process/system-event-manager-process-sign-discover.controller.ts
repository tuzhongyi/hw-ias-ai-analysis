import { EventEmitter, Injectable } from '@angular/core';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ConvertTool } from '../../../../../../../common/tools/convert-tool/convert.tool';
import { LanguageTool } from '../../../../../../../common/tools/language-tool/language.tool';
import { wait } from '../../../../../../../common/tools/wait';
import { SystemEventManagerWindow } from '../../system-event-manager.window';

@Injectable()
export class SystemEventManagerProcessSignDiscoverController {
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

  constructor(
    private window: SystemEventManagerWindow,
    private language: LanguageTool
  ) {}

  on = {
    create: (data: MobileEventRecord) => {
      let shop = ConvertTool.event.record.registration(data);
      this.window.shop.data = shop;
      this.window.shop.show = true;
    },
    merge: (data: {
      name?: string;
      subname: boolean;
      associated: ShopRegistration;
      data: MobileEventRecord;
    }) => {
      this.window.confirm.clear();
      this.window.confirm.message = `是否与商铺 ${data.associated.Name} 关联？`;
      this.window.confirm.show = true;

      wait(
        () => {
          return !(this.window.confirm.result === undefined);
        },
        () => {
          if (this.window.confirm.result) {
            this.event.merge.emit({
              eventId: data.data.Id,
              shopId: data.associated.Id,
              subname: data.subname,
              name: data.name,
            });
          }
        }
      );
    },
    marking: (data: MobileEventRecord) => {
      this.window.confirm.clear();
      if (data.Resources && data.Resources.length > 0) {
        let resource = data.Resources[0];
        this.window.confirm.message = `是否屏蔽 ${resource.ResourceName} ？`;
        this.window.confirm.show = true;

        wait(
          () => {
            return !(this.window.confirm.result === undefined);
          },
          () => {
            if (this.window.confirm.result) {
              this.event.marking.emit(data.Id);
            }
          }
        );
      }
    },

    shop: {
      ok: () => {
        this.load.emit();
        this.window.shop.show = false;
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
