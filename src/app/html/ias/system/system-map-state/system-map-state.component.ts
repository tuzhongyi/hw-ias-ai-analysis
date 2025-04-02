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
import { ShopObjectState } from '../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { SystemMapStateSourceController } from './controller/system-map-state-source.controller';

@Component({
  selector: 'ias-system-map-state',
  imports: [CommonModule],
  templateUrl: './system-map-state.component.html',
  styleUrl: './system-map-state.component.less',
  providers: [SystemMapStateSourceController],
})
export class SystemMapStateComponent implements OnChanges {
  @Input() datas: Shop[] = [];
  @Input() selecteds: ShopObjectState[] = [];
  @Output() selectedsChange = new EventEmitter<ShopObjectState[]>();
  constructor(public source: SystemMapStateSourceController) {}

  count = new Map<ShopObjectState, number>();

  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['datas']);
  }

  private change = {
    data: (change: SimpleChange) => {
      if (change) {
        this.init();
        this.datas.forEach((x) => {
          let count = this.count.get(x.ObjectState) ?? 0;
          this.count.set(x.ObjectState, count + 1);
        });
      }
    },
  };

  private init() {
    this.count.set(ShopObjectState.Disappeared, 0);
    this.count.set(ShopObjectState.Created, 0);
    this.count.set(ShopObjectState.Existed, 0);
  }

  onselect(state: ShopObjectState) {
    if (this.selecteds.includes(state)) {
      this.selecteds = this.selecteds.filter((x) => x !== state);
    } else {
      this.selecteds.push(state);
    }
    this.selectedsChange.emit(this.selecteds);
  }
}
