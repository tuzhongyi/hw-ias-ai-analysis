import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ias-system-map-statistic',
  imports: [CommonModule],
  templateUrl: './system-map-statistic.component.html',
  styleUrl: './system-map-statistic.component.less',
})
export class SystemMapStatisticComponent {
  @Input() shop = 0;
  @Input() color = '';
  @Input() title = '商铺';
}
