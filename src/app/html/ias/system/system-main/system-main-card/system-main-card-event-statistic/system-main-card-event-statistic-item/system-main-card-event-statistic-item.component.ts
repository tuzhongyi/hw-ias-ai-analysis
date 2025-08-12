import { Component, Input } from '@angular/core';
import { SystemMainCardEventStatisticItem } from './system-main-card-event-statistic-item.model';

@Component({
  selector: 'ias-system-main-card-event-statistic-item',
  imports: [],
  templateUrl: './system-main-card-event-statistic-item.component.html',
  styleUrl: './system-main-card-event-statistic-item.component.less',
})
export class SystemMainCardEventStatisticItemComponent {
  @Input() data = new SystemMainCardEventStatisticItem();
}
