import { Injectable } from '@angular/core';
import { ArmEventType } from '../../../../../../../common/data-core/enums/event/arm-event-type.enum';
import { GetMobileEventsParams } from '../../../../../../../common/data-core/requests/services/system/event/system-event.params';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';
import { LocaleCompare } from '../../../../../../../common/tools/compare-tool/compare.tool';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';

@Injectable()
export class SystemMainCardEventMobileTableManagerBusiness {
  constructor(private service: ArmSystemRequestService) {}

  async load(duration: Duration, types: ArmEventType[]) {
    let params = new GetMobileEventsParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.PageIndex = 1;
    params.PageSize = 20;
    params.Desc = 'EventTime';

    params.EventTypes = types;
    let paged = await this.service.event.list(params);
    return paged.Data.map((x) => {
      if (x.Resources && x.Resources.length > 0) {
        x.Resources = x.Resources.sort((a, b) => {
          return LocaleCompare.compare(b.PositionNo, a.PositionNo);
        });
      }
      return x;
    });
  }
}
