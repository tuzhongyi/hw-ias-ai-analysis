import { Injectable } from '@angular/core';
import { ArmDivisionType } from '../../../../../../../common/data-core/enums/division/divison-type.enum';
import { ArmEventType } from '../../../../../../../common/data-core/enums/event/arm-event-type.enum';
import { Division } from '../../../../../../../common/data-core/models/arm/division/division.model';
import { EventNumberStatistic } from '../../../../../../../common/data-core/models/arm/event/event-number-statistic.model';
import { Manager } from '../../../../../../../common/data-core/requests/managers/manager';
import { ArmAnalysisRequestService } from '../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetAnalysisGpsTaskSampleListParams } from '../../../../../../../common/data-core/requests/services/analysis/llm/analysis-llm.params';
import { ArmDivisionRequestService } from '../../../../../../../common/data-core/requests/services/division/division.service';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadObjectEventsParams } from '../../../../../../../common/data-core/requests/services/geographic/road/road-object/event/geographic-road-object-event.params';
import { GetEventNumbersParams } from '../../../../../../../common/data-core/requests/services/system/event/number/system-event-number.params';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';
import { GlobalStorage } from '../../../../../../../common/storage/global.storage';
import { ChartItem } from '../../../../../../../common/tools/chart-tool/chart.model';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';
import { ObjectTool } from '../../../../../../../common/tools/object-tool/object.tool';
import { wait } from '../../../../../../../common/tools/wait';
import { EventMode } from '../../../system-main-map-navigation/system-main-map-navigation.model';

@Injectable()
export class SystemMainCardStatisticEventBusiness {
  constructor(
    private manager: Manager,
    system: ArmSystemRequestService,
    analysis: ArmAnalysisRequestService,
    division: ArmDivisionRequestService,
    geo: ArmGeographicRequestService,
    private global: GlobalStorage
  ) {
    this.service = { system, analysis, division, geo };
  }

  private service: {
    system: ArmSystemRequestService;
    analysis: ArmAnalysisRequestService;
    division: ArmDivisionRequestService;
    geo: ArmGeographicRequestService;
  };

  async load(duration: Duration) {
    let data = {
      mobile: await this.data.statistic(duration),
      sample: await this.data.sample(duration),
      realtime: {
        types: await this.manager.source.event.LiveEventTypes.get(),
      },
      roadobject: await this.data.roadobject(duration),
    };

    await wait(() => !this.global.display.loading);

    let items: ChartItem[] = [];

    if (this.global.display.map.shop) {
      items.push({
        id: EventMode.shop,
        name: '商铺变更',
        value: this.convert(
          data.mobile,
          ObjectTool.model.MobileEventRecord.get.type.shop
        ),
      });
    }
    if (this.global.display.map.realtime) {
      items.push({
        id: EventMode.realtime,
        name: '实时事件',
        value: this.convert(
          data.mobile,
          data.realtime.types.map((x) => x.Value)
        ),
      });
    }
    if (this.global.display.map.gpstask) {
      items.push({
        id: EventMode.gpstask,
        name: '场景事件',
        value: data.sample.TotalRecordCount,
      });
    }
    if (this.global.display.map.roadobject) {
      items.push({
        id: EventMode.roadobject,
        name: '道路物件',
        value: data.roadobject.TotalRecordCount,
      });
    }

    return items;
  }

  private convert(datas: EventNumberStatistic[], types: ArmEventType[]) {
    if (!types || types.length === 0) return 0;
    let total = 0;
    for (const stat of datas) {
      for (const ev of stat.EventNumbers ?? []) {
        // 筛选在 types 中的类型
        if (types.includes(ev.EventType)) {
          total += Number(ev.DayNumber ?? 0);
        }
      }
    }
    return total;
  }

  data = {
    division: () => {
      return this.service.division.cache.all().then((x) => {
        return x.find(
          (d) => d.DivisionType === ArmDivisionType.County
        ) as Division;
      });
    },
    statistic: async (duration: Duration) => {
      let division = await this.data.division();
      let params = new GetEventNumbersParams();
      params.BeginDate = duration.begin;
      params.EndDate = duration.end;
      params.DivisionId = division.Id;
      params.DivisionType = division.DivisionType;
      params.TimeUnit = 1;
      return this.service.system.event.number.statistic(params);
    },

    sample: async (duration: Duration) => {
      let params = new GetAnalysisGpsTaskSampleListParams();
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      params.PageIndex = 1;
      params.PageSize = 1;
      params.Confirmed = true;
      params.IsAlarmRecord = true;
      let paged = await this.service.analysis.llm.gps.task.sample.list(params);
      return paged.Page;
    },
    roadobject: async (duration: Duration) => {
      let params = new GetRoadObjectEventsParams();
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      params.PageIndex = 1;
      params.PageSize = 1;
      params.Confirmed = true;
      params.IsMisInfo = false;
      let paged = await this.service.geo.road.object.event.list(params);
      return paged.Page;
    },
  };
}
