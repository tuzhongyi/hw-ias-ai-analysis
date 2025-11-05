import { Injectable } from '@angular/core';
import { SourceManager } from '../../../../../../../common/data-core/requests/managers/source/source.manager';
import { GetMobileEventsParams } from '../../../../../../../common/data-core/requests/services/system/event/system-event.params';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';
import { LocaleCompare } from '../../../../../../../common/tools/compare-tool/compare.tool';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';

@Injectable()
export class SystemMainCardEventRealtimeTableManagerBusiness {
  constructor(
    private service: ArmSystemRequestService,
    private source: SourceManager
  ) {}

  async load(duration: Duration) {
    let params = new GetMobileEventsParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.PageIndex = 1;
    params.PageSize = 20;
    params.Desc = 'EventTime';
    let types = await this.source.event.LiveEventTypes.get();
    params.EventTypes = types.map((x) => x.Value);
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
