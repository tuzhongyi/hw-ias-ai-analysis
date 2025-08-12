import { Injectable } from '@angular/core';
import { GetMobileEventsParams } from '../../../../../../../common/data-core/requests/services/system/event/system-event.params';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';

@Injectable()
export class SystemMainCardEventRealtimeTableManagerBusiness {
  constructor(private service: ArmSystemRequestService) {}

  async load(duration: Duration) {
    let params = new GetMobileEventsParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.PageIndex = 1;
    params.PageSize = 20;
    params.Desc = 'EventTime';
    let paged = await this.service.event.list(params);
    return paged.Data;
  }
}
