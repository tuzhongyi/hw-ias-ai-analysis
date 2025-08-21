import { Injectable } from '@angular/core';
import { AnalysisTask } from '../../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { ArmAnalysisRequestService } from '../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetAnalysisTaskListParams } from '../../../../../../../common/data-core/requests/services/analysis/server/analysis-server.params';
import { ArrayTool } from '../../../../../../../common/tools/array-tool/array.tool';
import { ChartItem } from '../../../../../../../common/tools/chart-tool/chart.model';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';

@Injectable()
export class SystemMainCardTaskStatisticChartBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  async load(duration: Duration) {
    let datas = await this.data.load(duration);
    let group = ArrayTool.groupBy<AnalysisTask, number>(datas, (item) => {
      let month = item.CreationTime!.getMonth();
      return month + 1;
    });
    console.log(group);
    let items: ChartItem<string>[] = [];
    for (let i = 0; i < 12; i++) {
      let month = ((duration.begin.getMonth() + i + 1) % 12) + 1;

      let item: ChartItem<string> = {
        id: month.toString(),
        name: `${month}月`,
        value: 0,
      };
      if (group[month]) {
        item.value = group[month].length;
      }
      items.push(item);
    }
    return items;
  }

  data = {
    load: (duration: Duration) => {
      let params = new GetAnalysisTaskListParams();
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      params.Asc = 'CreationTime';
      return this.service.server.task.all(params);
    },
  };
}
