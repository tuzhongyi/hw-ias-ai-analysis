import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { ShopRegistrationTaskDetectedResult } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration-task-detected-result.model';

@Component({
  selector: 'ias-system-task-route-map-panel-shop-registration-state',
  imports: [CommonModule],
  templateUrl:
    './system-task-route-map-panel-shop-registration-state.component.html',
  styleUrl:
    './system-task-route-map-panel-shop-registration-state.component.less',
})
export class SystemTaskRouteMapPanelShopRegistrationStateComponent
  implements OnChanges
{
  @Input() datas: ShopRegistrationTaskDetectedResult[] = [];
  @Input() selecteds: boolean[] = [true, false];
  @Output() selectedsChange = new EventEmitter<boolean[]>();

  constructor() {
    this.init();
  }

  count = new Map<boolean, number>();

  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['datas']);
  }
  change = {
    datas: (change: SimpleChange) => {
      if (change) {
        this.init();
        this.datas.forEach((x) => {
          let count = this.count.get(x.Detected ?? false) ?? 0;
          this.count.set(x.Detected ?? false, count + 1);
        });
      }
    },
  };

  private init() {
    this.count.set(true, 0);
    this.count.set(false, 0);
  }

  onselect(state: boolean) {
    if (this.selecteds.includes(state)) {
      this.selecteds = this.selecteds.filter((x) => x !== state);
    } else {
      this.selecteds.push(state);
    }
    this.selectedsChange.emit(this.selecteds);
  }
}
