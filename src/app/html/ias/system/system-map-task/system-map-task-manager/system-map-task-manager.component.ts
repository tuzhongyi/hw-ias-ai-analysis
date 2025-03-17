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
import { ShopObjectState } from '../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { Shop } from '../../../../../common/data-core/models/arm/analysis/shop.model';
import { SystemMapSourceTableShopComponent } from '../../system-map-source-table-shop/system-map-source-table-shop.component';
import { SystemMapTaskTableComponent } from '../system-map-task-table/system-map-task-table.component';
import { SystemMapTaskTableArgs } from '../system-map-task-table/system-map-task-table.model';

@Component({
  selector: 'ias-system-map-task-manager',
  imports: [
    CommonModule,
    SystemMapTaskTableComponent,
    SystemMapSourceTableShopComponent,
  ],
  templateUrl: './system-map-task-manager.component.html',
  styleUrl: './system-map-task-manager.component.less',
})
export class SystemMapTaskManagerComponent implements OnChanges {
  @Input() selecteds: string[] = [];
  @Output() selectedsChange = new EventEmitter<string[]>();

  @Input() name?: string;
  @Input() shops: Shop[] = [];

  @Output() close = new EventEmitter();
  @Output() compare = new EventEmitter();

  constructor() {}

  compared = false;
  datas: Shop[] = [];
  state = ShopObjectState.Created;
  State = ShopObjectState;

  task = {
    args: new SystemMapTaskTableArgs(),
    load: new EventEmitter<SystemMapTaskTableArgs>(),
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.shops(changes['shops']);
  }

  private change = {
    shops: (data: SimpleChange) => {
      if (data) {
        this.load.shop(data.currentValue, this.state);
      }
    },
    name: (data: SimpleChange) => {
      if (data) {
        this.task.args.name = data.currentValue;
        this.task.load.emit(this.task.args);
      }
    },
  };

  load = {
    shop: (datas: Shop[], state: ShopObjectState) => {
      this.datas = datas.filter((x) => x.ObjectState === state);
    },
  };

  onselect(datas: string[]) {
    this.selecteds = datas;
    this.selectedsChange.emit(this.selecteds);
  }
  onclose() {
    this.close.emit();
  }
  oncompare() {
    this.compare.emit();
    this.compared = true;
  }
  onstate(state: ShopObjectState) {
    this.state = state;
    this.load.shop(this.shops, state);
  }
}
