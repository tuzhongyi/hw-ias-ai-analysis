import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MobileDeviceStatementModel } from '../system-statistic-road-object-statement.model';

@Component({
  selector: 'ias-system-statistic-road-object-statement-8-chart',
  imports: [CommonModule],
  templateUrl:
    './system-statistic-road-object-statement-8-chart.component.html',
  styleUrl: './system-statistic-road-object-statement-8-chart.component.less',
})
export class SystemStatisticRoadObjectStatement8ChartComponent
  implements OnChanges
{
  @Input() datas: MobileDeviceStatementModel[] = [];

  max = {
    attendance: 0,
    distance: 0,
    duration: 0,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (this.datas.length > 0) {
      this.load(this.datas);
    }
  }

  private load(datas: MobileDeviceStatementModel[]) {
    datas.forEach((x) => {
      this.max.attendance = Math.max(this.max.attendance, x.attendance.count);
      this.max.distance = Math.max(this.max.distance, x.distance.total);
      this.max.duration = Math.max(this.max.duration, x.duration.total);
    });
  }
}
