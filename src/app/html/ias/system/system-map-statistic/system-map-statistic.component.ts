import { Component, Input } from '@angular/core';

@Component({
  selector: 'ias-system-map-statistic',
  imports: [],
  templateUrl: './system-map-statistic.component.html',
  styleUrl: './system-map-statistic.component.less',
})
export class SystemMapStatisticComponent {
  @Input() shop = 0;
}
