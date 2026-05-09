import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SystemStatisticRoadObjectStatement5ChartComponent } from '../system-statistic-road-object-statement-5-chart/system-statistic-road-object-statement-5-chart.component';
import { RoadObjectStatementModel } from '../system-statistic-road-object-statement.model';

@Component({
  selector: 'ias-system-statistic-road-object-statement-5-item',
  imports: [CommonModule, SystemStatisticRoadObjectStatement5ChartComponent],
  templateUrl: './system-statistic-road-object-statement-5-item.component.html',
  styleUrl: './system-statistic-road-object-statement-5-item.component.less',
})
export class SystemStatisticRoadObjectStatement5ItemComponent {
  @Input() data = new RoadObjectStatementModel();
}
