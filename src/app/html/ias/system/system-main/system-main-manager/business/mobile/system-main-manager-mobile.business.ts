import { SourceManager } from '../../../../../../../common/data-core/requests/managers/source/source.manager';
import { GetMobileEventsParams } from '../../../../../../../common/data-core/requests/services/system/event/system-event.params';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';
import { LocaleCompare } from '../../../../../../../common/tools/compare-tool/compare.tool';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';
import { ObjectTool } from '../../../../../../../common/tools/object-tool/object.tool';
import { EventMode } from '../../../system-main-map-navigation/system-main-map-navigation.model';

export class SystemMainManagerMobileBusiness {
  constructor(
    private service: ArmSystemRequestService,
    private source: SourceManager
  ) {}

  async load(duration: Duration, mode: EventMode) {
    let params = new GetMobileEventsParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.Desc = 'EventTime';
    params.Confirmed = true;
    params.IsMisInfo = false;
    params.Assigned = false;
    switch (mode) {
      case EventMode.realtime:
        let types = await this.source.event.LiveEventTypes.get();
        params.EventTypes = types.map((x) => x.Value);
        break;
      case EventMode.shop:
        params.EventTypes = ObjectTool.model.MobileEventRecord.get.type.shop;
        break;
      default:
        break;
    }

    let array = await this.service.event.all(params);
    return array.map((x) => {
      if (x.Resources && x.Resources.length > 0) {
        x.Resources = x.Resources.sort((a, b) => {
          return LocaleCompare.compare(b.PositionNo, a.PositionNo);
        });
      }
      return x;
    });
  }
}
