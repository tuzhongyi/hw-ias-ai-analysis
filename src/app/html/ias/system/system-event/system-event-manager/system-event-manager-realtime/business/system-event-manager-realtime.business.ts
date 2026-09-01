import { Injectable } from '@angular/core';
import { SystemEventHandleParams } from '../../../../../../../common/data-core/requests/services/system/event/handle/system-event-handle.params';
import { EventBlockedParams } from '../../../../../../../common/data-core/requests/services/system/event/system-event.params';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';
import { LocalStorage } from '../../../../../../../common/storage/local.storage';

@Injectable()
export class SystemEventManagerRealtimeBusiness {
  constructor(
    private service: ArmSystemRequestService,
    private local: LocalStorage,
  ) {}
  blocked(eventId: string, params: EventBlockedParams) {
    return this.service.event.blocked(eventId, params);
  }
  handle(eventId: string, params: SystemEventHandleParams) {
    let auth = this.local.auth.get();
    if (auth) {
      params.Handler = auth.username;
    }
    if (params.IsMisInfo) {
      params.Pictures = undefined;
    }
    return this.service.event.handle.data(eventId, params);
  }
}
