import { CommonModule, KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ias-system-main-card-statistic-number-division-item',
  imports: [CommonModule],
  templateUrl:
    './system-main-card-statistic-number-division-item.component.html',
  styleUrl: './system-main-card-statistic-number-division-item.component.less',
})
export class SystemMainCardStatisticNumberDivisionItemComponent {
  @Input() title: string = '';
  @Input() datas: KeyValue<string, { number: number; title: string }>[] = [];
}
