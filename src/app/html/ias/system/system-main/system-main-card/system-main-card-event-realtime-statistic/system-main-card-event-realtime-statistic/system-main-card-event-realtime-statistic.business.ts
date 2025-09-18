import { Injectable } from '@angular/core';
import { Manager } from '../../../../../../../common/data-core/requests/managers/manager';
import { GetMobileEventsParams } from '../../../../../../../common/data-core/requests/services/system/event/system-event.params';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';
import { ChartItem } from '../../../../../../../common/tools/chart-tool/chart.model';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';

@Injectable()
export class SystemMainCardEventRealtimeStatisticBusiness {
  constructor(
    private manager: Manager,
    private service: ArmSystemRequestService
  ) {}

  async load(duration: Duration) {
    let types = await this.manager.source.event.LiveEventTypes.get();
    let datas: ChartItem[] = [];
    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      let page = await this.data.load(duration, type.Value);
      datas.push({
        id: i,
        name: type.Name,
        value: page.TotalRecordCount,
      });
    }
    return datas;
  }

  data = {
    load: async (duration: Duration, type: number) => {
      let params = new GetMobileEventsParams();
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      params.PageIndex = 1;
      params.PageSize = 1;
      params.EmergencyType = type;
      let paged = await this.service.event.list(params);
      return paged.Page;
    },
  };
}
