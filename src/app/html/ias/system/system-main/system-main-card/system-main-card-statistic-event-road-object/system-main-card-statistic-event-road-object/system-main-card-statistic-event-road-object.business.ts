import { Injectable } from '@angular/core';
import { RoadObjectEventType } from '../../../../../../../common/data-core/enums/road/road-object/road-object-event-type.enum';
import { Manager } from '../../../../../../../common/data-core/requests/managers/manager';
import { ArmDivisionRequestService } from '../../../../../../../common/data-core/requests/services/division/division.service';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadObjectEventsParams } from '../../../../../../../common/data-core/requests/services/geographic/road/road-object/event/geographic-road-object-event.params';
import { ChartItem } from '../../../../../../../common/tools/chart-tool/chart.model';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';

@Injectable()
export class SystemMainCardStatisticEventRoadObjectBusiness {
  constructor(
    private manager: Manager,
    geo: ArmGeographicRequestService,
    division: ArmDivisionRequestService
  ) {
    this.service = { geo, division };
  }

  private service: {
    geo: ArmGeographicRequestService;
    division: ArmDivisionRequestService;
  };

  async load(duration: Duration) {
    let types = await this.manager.source.road.object.EventTypes.get();
    let items: ChartItem[] = [];
    let division = await this.data.division();
    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      let paged = await this.data.load(duration, type.Value, division?.Id);

      items.push({
        id: type.Value,
        name: type.Name,
        value: paged.Page.TotalRecordCount,
      });
    }

    return items;
  }

  data = {
    division: async () => {
      let all = await this.service.division.cache.all();
      return all.find((x) => !x.ParentId);
    },

    load: async (
      duration: Duration,
      type: RoadObjectEventType,
      divisionId?: string
    ) => {
      let params = new GetRoadObjectEventsParams();
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      if (divisionId) {
        params.DivisionIds = [divisionId];
      }
      params.EventType = type;
      params.PageIndex = 1;
      params.PageSize = 1;
      params.Confirmed = true;
      params.IsMisInfo = false;
      let paged = await this.service.geo.road.object.event.list(params);
      return paged;
    },
  };
}
