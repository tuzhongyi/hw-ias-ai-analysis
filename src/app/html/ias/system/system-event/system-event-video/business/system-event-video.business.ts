import { Injectable } from '@angular/core';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class SystemEventVideoBusiness {
  constructor(private service: ArmSystemRequestService) {}

  load(eventId: string) {
    return this.service.event.gps.items(eventId);
  }

  file(id: string) {
    return this.service.event.record.file(id);
  }
}
