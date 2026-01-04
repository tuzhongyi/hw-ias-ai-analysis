import { Injectable } from '@angular/core';
import { EventNumberStatistic } from '../../../../../../../common/data-core/models/arm/event/event-number-statistic.model';
import { EventNumber } from '../../../../../../../common/data-core/models/arm/event/event-number.model';
import { Manager } from '../../../../../../../common/data-core/requests/managers/manager';
import { ArmDivisionRequestService } from '../../../../../../../common/data-core/requests/services/division/division.service';
import { GetEventNumbersParams } from '../../../../../../../common/data-core/requests/services/system/event/number/system-event-number.params';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';
import { ChartItem } from '../../../../../../../common/tools/chart-tool/chart.model';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';

@Injectable()
export class SystemMainCardEventRealtimeStatisticBusiness {
  constructor(
    private manager: Manager,
    system: ArmSystemRequestService,
    division: ArmDivisionRequestService
  ) {
    this.service = { system, division };
  }

  private service: {
    system: ArmSystemRequestService;
    division: ArmDivisionRequestService;
  };

  async load(duration: Duration) {
    let division = await this.data.division();
    console.log(division);
    let types = await this.manager.source.event.LiveEventTypes.get();
    let datas = await this.data.load(division!.Id, duration);
    let items: ChartItem[] = [];
    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      items.push({
        id: type.Value,
        name: type.Name,
        value: this.convert(datas, type.Value),
      });
    }
    return items;
  }

  private convert(source: EventNumberStatistic[], type: number) {
    let datas: EventNumber[] = [];
    let value = 0;
    source.forEach((event) => {
      event.EventNumbers.forEach((number) => {
        if (number.EventType === type) {
          datas.push(number);
          value += number.DayNumber;
        }
      });
    });
    return value;
  }

  private data = {
    load: async (divisionId: string, duration: Duration) => {
      let params = new GetEventNumbersParams();
      params.BeginDate = duration.begin;
      params.EndDate = duration.end;
      params.TimeUnit = 1;
      params.DivisionId = divisionId;
      return this.service.system.event.number.statistic(params);
    },
    division: async () => {
      let all = await this.service.division.cache.all();
      return all.find((x) => !x.ParentId);
    },
  };
}
