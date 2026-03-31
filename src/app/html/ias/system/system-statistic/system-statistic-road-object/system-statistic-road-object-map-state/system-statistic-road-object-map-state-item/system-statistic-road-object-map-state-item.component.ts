import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SystemStatisticRoadObjectMapStateItem } from './system-statistic-road-object-map-state-item.model';

@Component({
  selector: 'ias-system-statistic-road-object-map-state-item',
  imports: [CommonModule],
  templateUrl: './system-statistic-road-object-map-state-item.component.html',
  styleUrl: './system-statistic-road-object-map-state-item.component.less',
})
export class SystemStatisticRoadObjectMapStateItemComponent {
  @Input() data = new SystemStatisticRoadObjectMapStateItem();

  @Input() selected = false;

  constructor() {}
}
