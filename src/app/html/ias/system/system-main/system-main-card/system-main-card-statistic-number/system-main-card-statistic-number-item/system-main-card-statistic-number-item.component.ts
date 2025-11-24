import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SystemMainCardStatisticNumberItem } from './system-main-card-statistic-number-item.model';

@Component({
  selector: 'ias-system-main-card-statistic-number-item',
  imports: [CommonModule],
  templateUrl: './system-main-card-statistic-number-item.component.html',
  styleUrl: './system-main-card-statistic-number-item.component.less',
})
export class SystemMainCardStatisticNumberItemComponent {
  @Input() data!: SystemMainCardStatisticNumberItem<any>;
}
