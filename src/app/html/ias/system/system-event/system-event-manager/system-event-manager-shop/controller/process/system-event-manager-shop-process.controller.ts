import { Injectable } from '@angular/core';
import { MobileEventRecord } from '../../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { SystemEventManagerShopProcessSignController } from './system-event-manager-shop-process-sign.controller';

@Injectable()
export class SystemEventManagerShopProcessController {
  constructor(public sign: SystemEventManagerShopProcessSignController) {}

  open(data: MobileEventRecord) {
    switch (data.EventType) {
      case 8:
        this.sign.disappear.open(data);
        break;
      case 9:
        this.sign.discover.open(data);
        break;
    }
  }
}
