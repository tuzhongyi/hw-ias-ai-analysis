import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { SystemMapStateSourceController } from './controller/system-map-state-source.controller';
import { SystemMapStateModel } from './system-map-state.model';

@Component({
  selector: 'ias-system-map-state',
  imports: [CommonModule],
  templateUrl: './system-map-state.component.html',
  styleUrl: './system-map-state.component.less',
  providers: [SystemMapStateSourceController],
})
export class SystemMapStateComponent implements OnChanges {
  @Input() datas: Shop[] = [];
  constructor(public source: SystemMapStateSourceController) {}

  count: SystemMapStateModel = {
    '0': 0,
    '1': 0,
    '2': 0,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datas']) {
      this.count = {
        '0': 0,
        '1': 0,
        '2': 0,
      };

      this.datas.forEach((x) => {
        this.count[x.ObjectState]++;
      });
    }
  }
}
