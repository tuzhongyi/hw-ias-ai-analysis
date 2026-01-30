import { Injectable } from '@angular/core';
import { RoadObjectEventRecord } from '../../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadObjectEventsParams } from '../../../../../../../common/data-core/requests/services/geographic/road/road-object/event/geographic-road-object-event.params';
import {
  IChartData,
  ITimeData,
} from '../../../../../../../common/tools/chart-tool/chart.model';
import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';

@Injectable()
export class SystemMainCardEventChartLineSampleBusiness {
  constructor(private service: ArmGeographicRequestService) {}
  async load(date: Date) {
    let duration = DateTimeTool.all.day(date);
    let datas = await this.data.load(duration);
    let times = DateTimeTool.full.day(date);

    let items: ITimeData<number>[] = [];
    times.forEach((begin, i) => {
      let end = new Date(begin.getTime());
      end.setMinutes(59, 59, 999);

      let filter = datas.filter((x) => {
        let t = new Date(x.EventTime);
        return begin <= t && t <= end;
      });
      let item = this.convert(i, begin, filter);
      items.push(item);
    });

    let data: IChartData = {
      Id: '',
      Name: '',
      datas: items,
    };

    return data;
  }

  private convert(index: number, time: Date, datas: RoadObjectEventRecord[]) {
    let item: ITimeData<number> = {
      index: index,
      time: time,
      value: datas.length,
    };
    return item;
  }

  private data = {
    load: (duration: Duration) => {
      let params = new GetRoadObjectEventsParams();
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      params.Confirmed = true;
      params.IsMisInfo = false;
      return this.service.road.object.event.all(params);
    },
  };
}
