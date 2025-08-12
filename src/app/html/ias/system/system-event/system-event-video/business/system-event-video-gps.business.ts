import { Injectable } from '@angular/core';
import { GetMobileEventFileGpsItemsParams } from '../../../../../../common/data-core/requests/services/system/event/system-event.params';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { SystemEventVideoArgs } from '../system-event-video.model';

@Injectable()
export class SystemEventVideoGPSBusiness {
  constructor(private service: ArmSystemRequestService) {}

  load(eventId: string, args: SystemEventVideoArgs) {
    let params = new GetMobileEventFileGpsItemsParams();
    params.Channel = args.channel;
    params.Duration = args.duration;
    params.Rectified = args.rectified;
    return this.service.event.gps.items(eventId, params);
  }
}
