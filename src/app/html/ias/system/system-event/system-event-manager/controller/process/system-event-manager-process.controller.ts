import { Injectable } from '@angular/core';
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { SystemEventManagerProcessSignController } from './system-event-manager-process-sign.controller';

@Injectable()
export class SystemEventManagerProcessController {
  constructor(public sign: SystemEventManagerProcessSignController) {}

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
