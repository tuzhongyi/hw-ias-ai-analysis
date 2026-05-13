import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoadObjectStatement } from '../../../../../../common/data-core/models/arm/geographic/road-object-statement.model';
import {
  IChartData,
  ITimeData,
} from '../../../../../../common/tools/chart-tool/chart.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { SystemStatisticRoadObjectStatement6ChartComponent } from '../system-statistic-road-object-statement-6-chart/system-statistic-road-object-statement-6-chart.component';
import { SystemStatisticRoadObjectStatementContainerComponent } from '../system-statistic-road-object-statement-container/system-statistic-road-object-statement-container.component';

@Component({
  selector: 'ias-system-statistic-road-object-statement-6',
  imports: [
    CommonModule,
    FormsModule,
    SystemStatisticRoadObjectStatementContainerComponent,
    SystemStatisticRoadObjectStatement6ChartComponent,
  ],
  templateUrl: './system-statistic-road-object-statement-6.component.html',
  styleUrl: './system-statistic-road-object-statement-6.component.less',
})
export class SystemStatisticRoadObjectStatement6Component implements OnInit {
  @Input() statement?: RoadObjectStatement;

  max?: ITimeData<number>;
  datas: IChartData[] = [];
  xAxis: string[] = [];

  Language = Language;

  ngOnInit(): void {
    if (this.statement) {
      this.load(this.statement);
    }
  }

  load(source: RoadObjectStatement) {
    this.xAxis = [];
    if (source.DailyEventTimes) {
      let max = {
        value: 0,
        time: source.BeginDate,
      };
      let data: IChartData<number> = {
        Id: source.Id,
        Name: '事件数量',
        datas: [],
      };
      data.datas = source.DailyEventTimes.map((x) => {
        let count = x.NormalTimes + x.BreakageTimes + x.DisappearTimes;
        if (count > max.value) {
          max.value = count;
          max.time = x.Date;
        }

        let data: ITimeData<number> = {
          value: count,
          time: x.Date,
        };
        this.xAxis.push(`${x.Date.getDate()}日`);
        return data;
      });
      this.max = max;
      this.datas = [data];
    }
  }
}
