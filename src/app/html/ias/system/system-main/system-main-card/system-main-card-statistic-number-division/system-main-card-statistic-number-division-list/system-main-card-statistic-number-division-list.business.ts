import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { ArmDivisionType } from '../../../../../../../common/data-core/enums/division/divison-type.enum';
import { ArmEventType } from '../../../../../../../common/data-core/enums/event/arm-event-type.enum';
import { Division } from '../../../../../../../common/data-core/models/arm/division/division.model';
import { EventNumberStatistic } from '../../../../../../../common/data-core/models/arm/event/event-number-statistic.model';
import { SourceManager } from '../../../../../../../common/data-core/requests/managers/source/source.manager';
import { ArmAnalysisRequestService } from '../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetAnalysisGpsTaskSampleListParams } from '../../../../../../../common/data-core/requests/services/analysis/llm/analysis-llm.params';
import { ArmDivisionRequestService } from '../../../../../../../common/data-core/requests/services/division/division.service';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadObjectEventsParams } from '../../../../../../../common/data-core/requests/services/geographic/road/road-object/event/geographic-road-object-event.params';
import { GetEventNumbersParams } from '../../../../../../../common/data-core/requests/services/system/event/number/system-event-number.params';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';
import { GlobalStorage } from '../../../../../../../common/storage/global.storage';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';
import { ObjectTool } from '../../../../../../../common/tools/object-tool/object.tool';

@Injectable()
export class SystemMainCardStatisticNumberDivisionBusiness {
  constructor(
    division: ArmDivisionRequestService,
    system: ArmSystemRequestService,
    analysis: ArmAnalysisRequestService,
    geo: ArmGeographicRequestService,
    private source: SourceManager,
    private global: GlobalStorage
  ) {
    this.service = {
      division,
      system,
      analysis,
      geo,
    };
  }
  private service: {
    division: ArmDivisionRequestService;
    system: ArmSystemRequestService;
    analysis: ArmAnalysisRequestService;
    geo: ArmGeographicRequestService;
  };

  async load(duration: Duration) {
    let divisions = await this.data.division();
    let types = await this.source.event.LiveEventTypes.get();
    let datas = new Map<
      Division,
      KeyValue<string, { number: number; title: string }>[]
    >();
    for (let i = 0; i < divisions.length; i++) {
      const division = divisions[i];
      let statistic = await this.data.statistic(division, duration);
      let value = {
        shop: this.converter.item(
          statistic,
          ObjectTool.model.MobileEventRecord.get.type.shop
        ),
        realtime: this.converter.item(
          statistic,
          types.map((x) => x.Value)
        ),
        sample: await this.data.sample(division.Id, duration),
        roadobject: await this.data.roadobject(division.Id, duration),
      };
      let items = [];
      if (this.global.display.map.shop) {
        items.push({
          key: 'howell-icon-shop',
          value: { number: value.shop, title: '商铺变更' },
        });
      }
      if (this.global.display.map.realtime) {
        items.push({
          key: 'howell-icon-alarm4',
          value: { number: value.realtime, title: '实时事件' },
        });
      }
      if (this.global.display.map.gpstask) {
        items.push({
          key: 'howell-icon-map6',
          value: { number: value.sample, title: '定制场景' },
        });
      }
      if (this.global.display.map.roadobject) {
        items.push({
          key: 'mdi mdi-map-marker-radius',
          value: { number: value.roadobject, title: '道路物件' },
        });
      }

      datas.set(division, items);
    }
    return datas;
  }

  private converter = {
    item: (datas: EventNumberStatistic[], types: ArmEventType[]) => {
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
    },
  };

  private data = {
    division: () => {
      return this.service.division.cache.all().then((x) => {
        return x.filter((d) => d.DivisionType === ArmDivisionType.GridCell);
      });
    },

    statistic: (division: Division, duration: Duration) => {
      let params = new GetEventNumbersParams();
      params.BeginDate = duration.begin;
      params.EndDate = duration.end;
      params.DivisionId = division.Id;
      params.DivisionType = division.DivisionType;
      return this.service.system.event.number.statistic(params);
    },
    sample: async (divisionId: string, duration: Duration) => {
      let params = new GetAnalysisGpsTaskSampleListParams();
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      params.Confirmed = true;
      params.IsAlarmRecord = true;
      params.PageSize = 1;
      params.DivisionId = divisionId;
      let paged = await this.service.analysis.llm.gps.task.sample.list(params);
      return paged.Page.TotalRecordCount;
    },
    roadobject: async (divisionId: string, duration: Duration) => {
      let params = new GetRoadObjectEventsParams();
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      params.PageIndex = 1;
      params.PageSize = 1;
      params.Confirmed = true;
      params.IsMisInfo = false;
      let paged = await this.service.geo.road.object.event.list(params);
      return paged.Page.TotalRecordCount;
    },
  };
}
