import { Injectable } from '@angular/core';
import { GpsTaskSampleRecord } from '../../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { ArmAnalysisRequestService } from '../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetAnalysisGpsTaskSampleListParams } from '../../../../../../../common/data-core/requests/services/analysis/llm/analysis-llm.params';
import {
  IChartData,
  ITimeData,
} from '../../../../../../../common/tools/chart-tool/chart.model';
import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';

@Injectable()
export class SystemMainCardEventChartLineSampleBusiness {
  constructor(private service: ArmAnalysisRequestService) {}
  async load(date: Date) {
    let duration = DateTimeTool.all.day(date);
    let datas = await this.data.load(duration);
    let times = DateTimeTool.full.day(date);

    let items: ITimeData<number>[] = [];
    times.forEach((begin, i) => {
      let end = new Date(begin.getTime());
      end.setMinutes(59, 59, 999);

      let filter = datas.filter((x) => {
        let t = new Date(x.Time);
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

  private convert(index: number, time: Date, datas: GpsTaskSampleRecord[]) {
    let item: ITimeData<number> = {
      index: index,
      time: time,
      value: datas.length,
    };
    return item;
  }

  private data = {
    load: (duration: Duration) => {
      let params = new GetAnalysisGpsTaskSampleListParams();
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      params.IsAlarmRecord = true;
      return this.service.llm.gps.task.sample.all(params);
    },
  };
}
