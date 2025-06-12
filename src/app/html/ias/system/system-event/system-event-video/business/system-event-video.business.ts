import { Injectable } from '@angular/core';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { SystemEventVideoArgs } from '../system-event-video.model';

@Injectable()
export class SystemEventVideoBusiness {
  constructor(private service: ArmSystemRequestService) {}

  load(args: SystemEventVideoArgs) {
    return this.service.event.gps.items(args.eventId);
  }

  file(id: string) {
    return this.service.event.record.file(id);
  }
}
