import { Injectable } from '@angular/core';
import { EventBlockedParams } from '../../../../../../../common/data-core/requests/services/system/event/system-event.params';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class SystemEventManagerRealtimeBusiness {
  constructor(private service: ArmSystemRequestService) {}
  blocked(eventId: string, params: EventBlockedParams) {
    return this.service.event.blocked(eventId, params);
  }
}
