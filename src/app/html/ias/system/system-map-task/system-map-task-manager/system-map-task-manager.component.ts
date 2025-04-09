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
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShopObjectState } from '../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { AnalysisTask } from '../../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { IShop } from '../../../../../common/data-core/models/arm/analysis/shop.interface';
import { SystemMapSourceTableShopComponent } from '../../system-map-source-table-shop/system-map-source-table-shop.component';
import { SystemMapTaskTableComponent } from '../system-map-task-table/system-map-task-table.component';
import { SystemMapTaskTableArgs } from '../system-map-task-table/system-map-task-table.model';
import {
  SystemMapTaskShops,
  TaskCompareType,
} from './system-map-task-manager.model';

@Component({
  selector: 'ias-system-map-task-manager',
  imports: [
    CommonModule,
    FormsModule,
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

  @Input() taskcount = 0;

  @Input() name?: string;
  @Input() shops?: SystemMapTaskShops;

  @Output() close = new EventEmitter();
  @Output('compare') tocompare = new EventEmitter<
    TaskCompareType | undefined
  >();

  @Output() return = new EventEmitter<void>();

  @Output() shopselectedChange = new EventEmitter<IShop>();
  @Output() details = new EventEmitter<IShop>();
  @Output() itemhover = new EventEmitter<IShop>();
  @Output() itemblur = new EventEmitter<IShop>();
  @Output() position = new EventEmitter<IShop>();

  @Output() loaded = new EventEmitter<AnalysisTask[]>();

  @Output() setting = new EventEmitter<void>();

  constructor() {}

  private subscription = new Subscription();

  datas: IShop[] = [];
  state = ShopObjectState.Created;
  State = ShopObjectState;
  maxselected = 2;
  TaskCompareType = TaskCompareType;

  compare = {
    doing: false,
    eachother: {
      change: () => {
        if (this.maxselected === 2) {
          this.maxselected = Number.MAX_VALUE;
        } else {
          this.maxselected = 2;
        }
      },
    },
    type: {
      used: false,
      value: TaskCompareType.base,
      change: () => {
        this.compare.type.used = true;
        this.maxselected = Number.MAX_VALUE;
      },
    },
  };

  task = {
    args: new SystemMapTaskTableArgs(),
    load: new EventEmitter<SystemMapTaskTableArgs>(),
  };
  get cancompare() {
    if (this.compare.type.used) {
      return this.taskselecteds.length > 0;
    } else {
      return this.taskselecteds.length === 2;
    }
  }

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
      if (data && !data.firstChange && data.currentValue) {
        this.load(data.currentValue, this.state);
        this.compare.doing = true;
      }
    },
    name: (data: SimpleChange) => {
      if (data) {
        this.task.args.name = data.currentValue;
        this.task.load.emit(this.task.args);
      }
    },
  };

  load(data: SystemMapTaskShops, state: ShopObjectState) {
    switch (state) {
      case ShopObjectState.Created:
        this.datas = [...data.created];
        break;
      case ShopObjectState.Disappeared:
        this.datas = [...data.disappeared];
        break;
      case ShopObjectState.Existed:
        this.datas = [...data.existed];
        break;
      default:
        break;
    }
  }

  onselect(datas: string[]) {
    this.taskselecteds = datas;
    this.taskselectedsChange.emit(this.taskselecteds);
  }
  onclose() {
    this.close.emit();
  }
  oncompare() {
    if (this.compare.type.used) {
      this.tocompare.emit(this.compare.type.value);
    } else {
      this.tocompare.emit();
    }
  }
  onreturn() {
    this.compare.doing = false;
    this.return.emit();
  }
  onstate(state: ShopObjectState) {
    this.state = state;
    if (this.shops) {
      this.load(this.shops, state);
    }
  }
  onloaded(datas: AnalysisTask[]) {
    this.taskcount = datas.length;
    this.loaded.emit(datas);
  }

  shop = {
    onselected: (data?: IShop) => {
      this.shopselectedChange.emit(data);
    },
    ondetails: (data: IShop) => {
      this.details.emit(data);
    },
    onposition: (data: IShop) => {
      this.position.emit(data);
    },
    onmouseover: (data: IShop) => {
      this.itemhover.emit(data);
    },
    onmouseout: (data: IShop) => {
      this.itemblur.emit(data);
    },
  };

  onsetting() {
    this.setting.emit();
  }
}
