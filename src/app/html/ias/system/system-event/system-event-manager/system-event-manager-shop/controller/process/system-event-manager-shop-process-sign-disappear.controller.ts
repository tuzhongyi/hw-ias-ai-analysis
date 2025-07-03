import { EventEmitter, Injectable } from '@angular/core';
import { MobileEventRecord } from '../../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { LanguageTool } from '../../../../../../../../common/tools/language-tool/language.tool';
import { wait } from '../../../../../../../../common/tools/wait';
import { SystemEventManagerShopWindow } from '../../system-event-manager-shop.window';

@Injectable()
export class SystemEventManagerShopProcessSignDisappearController {
  event = {
    misinfo: new EventEmitter<string>(),
    delete: new EventEmitter<string>(),
  };

  load = new EventEmitter<void>();

  constructor(
    private window: SystemEventManagerShopWindow,
    private language: LanguageTool
  ) {}

  on = {
    misinfo: async (data: MobileEventRecord) => {
      this.window.confirm.clear();
      if (data.Resources && data.Resources.length > 0) {
        let resource = data.Resources[0];
        let type = await this.language.event.EventType(data.EventType);
        this.window.confirm.message = `是否标记 ${type} ${resource.ResourceName} 为误报？`;
        this.window.confirm.show = true;

        wait(
          () => {
            return !(this.window.confirm.result === undefined);
          },
          () => {
            if (this.window.confirm.result) {
              this.event.misinfo.emit(data.Id);
            }
          }
        );
      }
    },
    delete: async (data: MobileEventRecord) => {
      this.window.confirm.clear();
      if (data.Resources && data.Resources.length > 0) {
        let resource = data.Resources[0];
        this.window.confirm.message = `是否删除商铺 ${resource.ResourceName} ？`;
        this.window.confirm.show = true;

        wait(
          () => {
            return !(this.window.confirm.result === undefined);
          },
          () => {
            if (this.window.confirm.result) {
              this.event.delete.emit(data.Id);
            }
          }
        );
      }
    },
  };
  close() {
    this.window.process.sign.disappear.show = false;
  }
  open(data: MobileEventRecord) {
    this.window.process.sign.disappear.data = data;
    this.window.process.sign.disappear.show = true;
  }
}
