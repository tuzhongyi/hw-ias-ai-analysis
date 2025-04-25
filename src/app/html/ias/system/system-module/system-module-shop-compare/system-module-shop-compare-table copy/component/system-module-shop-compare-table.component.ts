import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ShopObjectState } from '../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ShopTaskCompareResult } from '../../../../../../../common/data-core/models/arm/analysis/shop-task-compare-result.model';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import {
  Page,
  Paged,
} from '../../../../../../../common/data-core/models/page-list.model';
import { SystemModuleShopCompareTableBusiness } from '../business/system-module-shop-compare-table.business';
import {
  ShopCompareMode,
  SystemModuleShopCompareTableArgs,
  SystemModuleShopCompareTableResult,
} from '../business/system-module-shop-compare-table.model';
import { SystemModuleShopCompareTableProviders } from '../business/system-module-shop-compare-table.provider';
import { SystemModuleShopCompareTableCreatedComponent } from '../system-module-shop-compare-table-created/system-module-shop-compare-table-created.component';
import { SystemModuleShopCompareTableDisappearedComponent } from '../system-module-shop-compare-table-disappeared/system-module-shop-compare-table-disappeared.component';
import { SystemModuleShopCompareTableExistedComponent } from '../system-module-shop-compare-table-existed/system-module-shop-compare-table-existed.component';

@Component({
  selector: 'ias-system-module-shop-compare-table',
  imports: [
    CommonModule,
    SystemModuleShopCompareTableCreatedComponent,
    SystemModuleShopCompareTableDisappearedComponent,
    SystemModuleShopCompareTableExistedComponent,
  ],
  templateUrl: './system-module-shop-compare-table.component.html',
  styleUrl: './system-module-shop-compare-table.component.less',
  providers: [...SystemModuleShopCompareTableProviders],
})
export class SystemModuleShopCompareTableComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() args = new SystemModuleShopCompareTableArgs();
  @Input() state = ShopObjectState.Created;
  @Input() mode = ShopCompareMode.registration;
  @Input('load') _load?: EventEmitter<SystemModuleShopCompareTableArgs>;
  @Output() loaded = new EventEmitter<SystemModuleShopCompareTableResult>();
  @Output() info = new EventEmitter<IShop>();
  @Output() compare = new EventEmitter<Paged<ShopTaskCompareResult>>();
  @Input('page') pagechange?: EventEmitter<number>;

  @Input() selecteds: IShop[] = [];
  @Output() selectedsChange = new EventEmitter<IShop[]>();

  constructor(private business: SystemModuleShopCompareTableBusiness) {}

  widths = ['150px', 'auto', 'auto', 'auto', 'auto'];
  data: {
    created: IShop[];
    disappeared: IShop[];
    existed: IShop[];
    result: ShopTaskCompareResult[];
  } = {
    created: [],
    disappeared: [],
    existed: [],
    result: [],
  };
  subscription = new Subscription();
  ShopObjectState = ShopObjectState;

  ngOnInit(): void {
    if (this._load) {
      let sub = this._load.subscribe((args) => {
        this.args = args;
        this.load.do(this.args, this.mode);
      });
      this.subscription.add(sub);
    }
    if (this.pagechange) {
      let sub = this.pagechange.subscribe((index) => {
        let data = this.data.existed[index - 1];
        if (index >= 1) {
          let result = this.data.result.find((x) => x.Shop?.Id === data.Id);
          if (result) {
            let paged = new Paged<ShopTaskCompareResult>();
            paged.Data = result;
            paged.Page = Page.create(index, 1, this.data.existed.length);
            this.compare.emit(paged);
          }
        }
      });
      this.subscription.add(sub);
    }

    this.load.do(this.args, this.mode);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.mode(changes['mode']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private change = {
    mode: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load.do(this.args, this.mode);
      }
    },
  };

  private load = {
    do: async (
      args: SystemModuleShopCompareTableArgs,
      mode: ShopCompareMode
    ) => {
      let promise: Promise<void>;
      switch (mode) {
        case ShopCompareMode.based:
          promise = this.load.based(args);
          break;
        case ShopCompareMode.registration:
          promise = this.load.registration(args);
          break;
        default:
          promise = Promise.resolve();
          break;
      }

      promise.then((x) => {
        let result = new SystemModuleShopCompareTableResult();
        result.task = this.business.count.task;
        result.shop.created = this.data.created.length;
        result.shop.disappeared = this.data.disappeared.length;
        result.shop.existed = this.data.existed.length;

        this.loaded.emit(result);
      });
    },
    based: (args: SystemModuleShopCompareTableArgs) => {
      return this.business.based(args).then((datas) => {
        this.data.created = datas.filter(
          (x) => x.ObjectState === ShopObjectState.Created
        );
        this.data.disappeared = datas.filter(
          (x) => x.ObjectState === ShopObjectState.Disappeared
        );
        this.data.existed = datas.filter(
          (x) => x.ObjectState === ShopObjectState.Existed
        );
      });
    },
    registration: (args: SystemModuleShopCompareTableArgs) => {
      return this.business.registration(args).then((datas) => {
        this.data.created = [];
        this.data.disappeared = [];
        this.data.existed = [];
        this.data.result = [];

        this.data.result = [...datas];

        for (let i = 0; i < datas.length; i++) {
          let data = datas[i];
          switch (data.ObjectState) {
            case ShopObjectState.Created:
              if (data.Shop) {
                this.data.created.push(data.Shop);
              }
              break;
            case ShopObjectState.Disappeared:
              if (data.ShopRegistration) {
                this.data.disappeared.push(data.ShopRegistration);
              }
              break;
            case ShopObjectState.Existed:
              if (data.Shop) {
                this.data.existed.push(data.Shop);
              }
              break;
            default:
              break;
          }
        }
      });
    },
  };
  oninfo(data: IShop) {
    this.info.emit(data);
  }
  oncompare(data: IShop) {
    let index = this.data.existed.findIndex((x) => x.Id === data.Id);
    if (index >= 0) {
      let result = this.data.result.find((x) => x.Shop?.Id === data.Id);
      if (result) {
        let paged = new Paged<ShopTaskCompareResult>();
        paged.Data = result;
        paged.Page = Page.create(index + 1, 1, this.data.existed.length);
        this.compare.emit(paged);
      }
    }
  }
  onselect(datas: IShop[]) {
    this.selecteds = datas;
    this.selectedsChange.emit(datas);
  }
}
