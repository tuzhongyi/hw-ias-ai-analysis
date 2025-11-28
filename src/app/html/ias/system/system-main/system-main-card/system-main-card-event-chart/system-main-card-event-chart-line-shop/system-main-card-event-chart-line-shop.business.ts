import { Injectable } from '@angular/core';
import { Division } from '../../../../../../../common/data-core/models/arm/division/division.model';
import { EventNumberStatistic } from '../../../../../../../common/data-core/models/arm/event/event-number-statistic.model';
import { IIdNameModel } from '../../../../../../../common/data-core/models/model.interface';
import { SourceManager } from '../../../../../../../common/data-core/requests/managers/source/source.manager';
import { ArmDivisionRequestService } from '../../../../../../../common/data-core/requests/services/division/division.service';
import { GetEventNumbersParams } from '../../../../../../../common/data-core/requests/services/system/event/number/system-event-number.params';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';
import {
  IChartData,
  ITimeData,
} from '../../../../../../../common/tools/chart-tool/chart.model';
import { ChartTool } from '../../../../../../../common/tools/chart-tool/chart.tool';
import { ColorTool } from '../../../../../../../common/tools/color/color.tool';
import { LocaleCompare } from '../../../../../../../common/tools/compare-tool/compare.tool';
import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';
import { ObjectTool } from '../../../../../../../common/tools/object-tool/object.tool';

@Injectable()
export class SystemMainCardEventChartLineShopBusiness {
  constructor(
    system: ArmSystemRequestService,
    division: ArmDivisionRequestService,
    private source: SourceManager
  ) {
    this.service = {
      system: system,
      division: division,
    };
  }

  async load(duration: Duration) {
    let division = await this.data.division();
    let datas = await this.data.load(division, duration);

    let items: IChartData[] = [];
    let types = await this.source.event.EventTypes.get();
    let shops = ObjectTool.model.MobileEventRecord.get.type.shop.sort(
      (a, b) => {
        return b - a;
      }
    );
    for (let i = 0; i < shops.length; i++) {
      const type = ObjectTool.model.MobileEventRecord.get.type.shop[i];
      let item = this.convert(division, datas, type);

      let color = ColorTool.EventType(type);
      item.color = ChartTool.color.get(color);
      item.Name = types.find((x) => x.Value == type)?.Name ?? '';
      items.push(item);
    }

    return items;
  }
  private convert(
    source: IIdNameModel,
    datas: EventNumberStatistic[],
    type: number
  ): IChartData {
    // 使用时间戳（ms）作为 key，聚合每天的总和
    const sumByTime = new Map<number, number>();

    for (const stat of datas) {
      // 保障 BeginTime 是 Date
      const time =
        stat.BeginTime instanceof Date
          ? stat.BeginTime
          : new Date(stat.BeginTime);
      const key = time.getTime();

      // 计算这一天/时间段匹配 types 的累加值
      let daySum = 0;
      if (Array.isArray(stat.EventNumbers)) {
        for (const ev of stat.EventNumbers) {
          // ev.EventType 可能是 number，与 types 中的 ArmEventType 比较
          if (ev.EventType == type) {
            // 优先使用 DayNumber；若你想用 DeltaNumber，可改为 (ev.DeltaNumber ?? 0)
            daySum += Number(ev.DayNumber ?? 0);
          }
        }
      }

      // 累加到 map（允许同一天出现多条记录时合并）
      sumByTime.set(key, (sumByTime.get(key) ?? 0) + daySum);
    }

    // 将聚合结果按时间升序转成 ITimeData 数组
    const sortedTimes = Array.from(sumByTime.keys()).sort((a, b) => a - b);

    const timeDatas: ITimeData<number>[] = sortedTimes.map((ts, idx) => ({
      time: new Date(ts),
      value: sumByTime.get(ts) ?? 0,
      index: idx,
    }));

    // 返回单条汇总曲线（id/name 可按需求调整）
    return {
      Id: source.Id,
      Name: source.Name,
      datas: timeDatas,
    };
  }

  private service: {
    system: ArmSystemRequestService;
    division: ArmDivisionRequestService;
  };

  private data = {
    load: async (division: Division, duration: Duration) => {
      let params = new GetEventNumbersParams();
      params.BeginDate = duration.begin;
      params.EndDate = duration.end;
      params.TimeUnit = 1;

      if (division) {
        params.DivisionId = division.Id;
        params.DivisionType = division.DivisionType;
      }
      return this.service.system.event.number
        .statistic(params)
        .then((datas) => {
          let dates = DateTimeTool.full.days(duration);
          dates.forEach((date) => {
            let has = false;
            let i = 0;

            for (; i < datas.length; i++) {
              const item = datas[i];
              let day = DateTimeTool.all.day(item.BeginTime);
              if (DateTimeTool.math.in(date, day)) {
                has = true;
                break;
              }
            }
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            if (!has && date < today) {
              let data = new EventNumberStatistic();
              let d = DateTimeTool.all.day(date);
              data.BeginTime = d.begin;
              data.EndTime = d.end;
              data.EventNumbers = [];
              datas.push(data);
            }
          });
          datas = datas.sort((a, b) => {
            return LocaleCompare.compare(a.BeginTime, b.BeginTime);
          });
          return datas;
        });
    },
    division: async () => {
      let datas = await this.service.division.cache.all();
      return datas.find((x) => !x.ParentId) as Division;
    },
  };
}
