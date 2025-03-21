import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
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
export class SystemMapTaskManagerComponent implements OnChanges, OnInit {
  @Input('load') _load?: EventEmitter<string>;
  @Input() taskselecteds: string[] = [];
  @Output() taskselectedsChange = new EventEmitter<string[]>();

  @Input() name?: string;
  @Input() shops: Shop[] = [];

  @Output() close = new EventEmitter();
  @Output() compare = new EventEmitter();

  @Output() shopselectedChange = new EventEmitter<Shop>();
  @Output() details = new EventEmitter<Shop>();
  @Output() itemhover = new EventEmitter<Shop>();
  @Output() itemblur = new EventEmitter<Shop>();
  @Output() position = new EventEmitter<Shop>();

  constructor() {}

  private subscription = new Subscription();
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
  ngOnInit(): void {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.task.args.name = x;
        this.task.load.emit(this.task.args);
      });
      this.subscription.add(sub);
    }
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
    this.taskselecteds = datas;
    this.taskselectedsChange.emit(this.taskselecteds);
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

  shop = {
    onselected: (data?: Shop) => {
      this.shopselectedChange.emit(data);
    },
    ondetails: (data: Shop) => {
      this.details.emit(data);
    },
    onposition: (data: Shop) => {
      this.position.emit(data);
    },
    onmouseover: (data: Shop) => {
      this.itemhover.emit(data);
    },
    onmouseout: (data: Shop) => {
      this.itemblur.emit(data);
    },
  };
}
