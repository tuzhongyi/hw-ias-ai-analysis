import { Injectable } from '@angular/core';
import { ArmDivisionType } from '../../../../../../../common/data-core/enums/division/divison-type.enum';
import { ArmEventType } from '../../../../../../../common/data-core/enums/event/arm-event-type.enum';
import { Division } from '../../../../../../../common/data-core/models/arm/division/division.model';
import { EventNumberStatistic } from '../../../../../../../common/data-core/models/arm/event/event-number-statistic.model';
import { Manager } from '../../../../../../../common/data-core/requests/managers/manager';
import { ArmAnalysisRequestService } from '../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { ArmDivisionRequestService } from '../../../../../../../common/data-core/requests/services/division/division.service';
import { GetEventNumbersParams } from '../../../../../../../common/data-core/requests/services/system/event/number/system-event-number.params';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';
import { ChartItem } from '../../../../../../../common/tools/chart-tool/chart.model';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';
import { ObjectTool } from '../../../../../../../common/tools/object-tool/object.tool';

@Injectable()
export class SystemMainCardStatisticEventShopBusiness {
  constructor(
    private manager: Manager,
    system: ArmSystemRequestService,
    analysis: ArmAnalysisRequestService,
    division: ArmDivisionRequestService
  ) {
    this.service = { system, analysis, division };
  }

  private service: {
    system: ArmSystemRequestService;
    analysis: ArmAnalysisRequestService;
    division: ArmDivisionRequestService;
  };

  async load(duration: Duration) {
    let data = {
      mobile: await this.data.statistic(duration),
    };
    let types = await this.manager.source.event.EventTypes.get();
    types = types
      .filter((x) =>
        ObjectTool.model.MobileEventRecord.get.type.shop.includes(x.Value)
      )
      .sort((a, b) => {
        return b.Value - a.Value;
      });
    let items: ChartItem[] = [];
    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      let item = this.convert(data.mobile, type.Value);
      items.push({
        id: type.Value,
        name: type.Name,
        value: item,
      });
    }

    return items;
  }

  private convert(datas: EventNumberStatistic[], type: ArmEventType) {
    let total = 0;
    for (const stat of datas) {
      for (const ev of stat.EventNumbers ?? []) {
        // 筛选在 types 中的类型
        if (ev.EventType == type) {
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
  };
}
