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
import { AnalysisTask } from '../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { ShopSign } from '../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { Page } from '../../../../common/data-core/models/page-list.model';
import { Language } from '../../../../common/tools/language';
import { SystemTaskResultShopTableBusiness } from '../system-task-result-shop-table/system-task-result-shop-table.business';
import { SystemTaskResultShopTableComponent } from '../system-task-result-shop-table/system-task-result-shop-table.component';
import { SystemTaskResultSignTableComponent } from '../system-task-result-sign-table/system-task-result-sign-table.component';
import { SystemTaskResultTableManagerShopController } from './controller/system-task-result-table-manager-shop.controller';
import { SystemTaskResultTableManagerSignController } from './controller/system-task-result-table-manager-sign.controller';
import { SystemTaskResultTableManagerSourceController } from './controller/system-task-result-table-manager-source.controller';
import { SystemTaskResultTableType } from './system-task-result-table-manager.model';

@Component({
  selector: 'ias-system-task-result-table-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemTaskResultSignTableComponent,
    SystemTaskResultShopTableComponent,
  ],
  templateUrl: './system-task-result-table-manager.component.html',
  styleUrl: './system-task-result-table-manager.component.less',
  providers: [
    SystemTaskResultTableManagerShopController,
    SystemTaskResultTableManagerSignController,
    SystemTaskResultTableManagerSourceController,
    SystemTaskResultShopTableBusiness,
  ],
})
export class SystemTaskResultTableManagerComponent
  implements OnInit, OnChanges
{
  @Input() data?: AnalysisTask;
  @Input() selected?: ShopSign;
  @Output() selectedChange = new EventEmitter<ShopSign>();

  @Input() index?: EventEmitter<number>;
  @Output() page = new EventEmitter<Page>();
  @Output() loaded = new EventEmitter<ShopSign[]>();
  @Output() error = new EventEmitter<Error>();

  @Input() type = SystemTaskResultTableType.shop;
  @Output() typeChange = new EventEmitter<SystemTaskResultTableType>();
  @Input('load') _load?: EventEmitter<string>;

  constructor(
    public source: SystemTaskResultTableManagerSourceController,
    public shop: SystemTaskResultTableManagerShopController,
    public sign: SystemTaskResultTableManagerSignController
  ) {}

  Language = Language;

  filter = {
    channel: undefined,
    type: undefined,
    label: undefined,
    confidence: 0,
  };

  trigger = {
    channel: () => {
      this.shop.args.channel = this.filter.channel;
      this.sign.args.channel = this.filter.channel;
      this.load();
    },
    type: () => {
      this.shop.args.type = this.filter.type;
      this.sign.args.type = this.filter.type;
      this.load();
    },
    label: () => {
      this.shop.args.label = this.filter.label;
      this.sign.args.label = this.filter.label;
      this.load();
    },
    confidence: () => {
      this.shop.args.confidence = this.filter.confidence / 100;
      this.sign.args.confidence = this.filter.confidence / 100;
      this.load();
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.changetype(changes['type']);
  }
  changetype(change: SimpleChange) {
    if (change && !change.firstChange) {
      this.load();
    }
  }

  ngOnInit(): void {
    if (this._load) {
      this._load.subscribe((x) => {
        this.shop.args.name = x;
        this.load();
      });
    }

    this.shop.select.subscribe((x) => {
      this.sign.args.shopId = x.Id;
      this.sign.load();
    });
    this.sign.select.subscribe((x) => {
      this.selected = x;
      this.selectedChange.emit(x);
    });

    if (this.data) {
      this.shop.args.taskId = this.data.Id;
      this.sign.args.taskId = this.data.Id;
    }
  }

  load() {
    if (this.type === SystemTaskResultTableType.shop) {
      this.shop.load();
    } else {
      this.sign.args.shopId = undefined;
      this.sign.load();
    }
  }

  onpage(page: Page) {
    this.page.emit(page);
  }
  onloaded(signs: ShopSign[]) {
    this.loaded.emit(signs);
  }
  onerror(error: Error) {
    this.error.emit(error);
  }
  onswitch() {
    this.type =
      this.type == SystemTaskResultTableType.shop
        ? SystemTaskResultTableType.sign
        : SystemTaskResultTableType.shop;
    this.typeChange.emit(this.type);
    this.load();
  }
}
