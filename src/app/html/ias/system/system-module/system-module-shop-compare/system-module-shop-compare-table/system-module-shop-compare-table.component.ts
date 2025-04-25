import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginatorComponent } from '../../../../../../common/components/paginator/paginator.component';
import { ShopObjectState } from '../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { ShopTaskCompareResult } from '../../../../../../common/data-core/models/arm/analysis/shop-task-compare-result.model';
import { IShop } from '../../../../../../common/data-core/models/arm/analysis/shop.interface';
import {
  Page,
  Paged,
} from '../../../../../../common/data-core/models/page-list.model';
import { TableSorterDirective } from '../../../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../../../common/directives/table-sorter/table-sorter.model';
import { ColorTool } from '../../../../../../common/tools/color/color.tool';
import { LocaleCompare } from '../../../../../../common/tools/compare-tool/compare.tool';
import { Language } from '../../../../../../common/tools/language';
import { IShopViewModel } from '../../../../../../common/view-models/shop/shop.view-model';
import { SystemModuleShopCompareTableBusiness } from './business/system-module-shop-compare-table.business';
import {
  SystemModuleShopCompareTableArgs,
  SystemModuleShopCompareTableData,
} from './business/system-module-shop-compare-table.model';
import { SystemModuleShopCompareTableProviders } from './business/system-module-shop-compare-table.provider';

@Component({
  selector: 'ias-system-module-shop-compare-table',
  imports: [CommonModule, PaginatorComponent, TableSorterDirective],
  templateUrl: './system-module-shop-compare-table.component.html',
  styleUrl: './system-module-shop-compare-table.component.less',
  providers: [...SystemModuleShopCompareTableProviders],
})
export class SystemModuleShopCompareTableComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() args = new SystemModuleShopCompareTableArgs();
  @Input('load') _load?: EventEmitter<SystemModuleShopCompareTableArgs>;

  @Input() selected?: IShop;
  @Output() selectedChange = new EventEmitter<IShop>();

  @Output() info = new EventEmitter<IShop>();
  @Output() sign = new EventEmitter<IShop>();

  @Output() compare = new EventEmitter<Paged<ShopTaskCompareResult>>();
  @Input() compareget?: EventEmitter<number>;

  @Output('picture') _picture = new EventEmitter<Paged<IShop>>();
  @Input() pictureget?: EventEmitter<number>;

  @Output() loaded = new EventEmitter<Map<ShopObjectState, number>>();

  constructor(private business: SystemModuleShopCompareTableBusiness) {}

  widths = [
    '5%',
    '5%',
    '15%',
    '20%',
    '8%',
    '8%',
    '8%',
    '7%',
    '10%',
    '10%',
    '6%',
  ];

  data = {
    source: new SystemModuleShopCompareTableData(),
    shop: [] as (IShopViewModel | undefined)[],
  };

  page = Page.create(1, 10);

  subscription = new Subscription();
  ShopObjectState = ShopObjectState;
  Color = ColorTool;
  Language = Language;

  ngOnInit(): void {
    this.regist();
    this.load.source(this.args).then((x) => {
      let datas = this.load.filter(this.data.source.shop, this.args);
      this.load.page(1, this.page.PageSize, datas);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private regist() {
    if (this._load) {
      let sub = this._load.subscribe((args) => {
        this.args = args;
        this.load.source(this.args).then((x) => {
          let datas = this.load.filter(this.data.source.shop, this.args);
          this.load.page(this.page.PageIndex, this.page.PageSize, datas);
        });
      });
      this.subscription.add(sub);
    }
    if (this.pictureget) {
      let sub = this.pictureget.subscribe((index) => {
        let datas = this.load.filter(this.data.source.shop, this.args);
        if (this.load.sort.value) {
          datas = this.load.sort.on(datas, this.load.sort.value);
        }

        let paged = new Paged<IShop>();
        paged.Data = datas[index - 1];
        paged.Page = new Page();
        paged.Page.PageCount = this.page.TotalRecordCount;
        paged.Page.PageIndex = index;
        paged.Page.PageSize = 1;
        paged.Page.RecordCount = 1;
        paged.Page.TotalRecordCount = this.page.TotalRecordCount;
        this._picture.emit(paged);
      });
      this.subscription.add(sub);
    }
    if (this.compareget) {
      let sub = this.compareget.subscribe((index) => {
        let datas = this.load.filter(this.data.source.shop, this.args);
        if (this.load.sort.value) {
          datas = this.load.sort.on(datas, this.load.sort.value);
        }

        let paged = new Paged<ShopTaskCompareResult>();

        let result = this.data.source.result.find(
          (x) => x.Shop?.Id === datas[index - 1].Id
        );
        if (result) {
          paged.Data = result;
          paged.Page = new Page();
          paged.Page.PageCount = this.page.TotalRecordCount;
          paged.Page.PageIndex = index;
          paged.Page.PageSize = 1;
          paged.Page.RecordCount = 1;
          paged.Page.TotalRecordCount = this.page.TotalRecordCount;
          this.compare.emit(paged);
        }
      });
      this.subscription.add(sub);
    }
  }

  private load = {
    source: (args: SystemModuleShopCompareTableArgs) => {
      return this.business.load(args).then((x) => {
        this.data.source = x;
        this.data.source.shop = this.data.source.shop.sort((a, b) => {
          return a.ObjectState - b.ObjectState;
        });
        this.loaded.emit(
          new Map<ShopObjectState, number>([
            [ShopObjectState.Created, this.business.count.created],
            [ShopObjectState.Existed, this.business.count.existed],
            [ShopObjectState.Disappeared, this.business.count.disappeared],
          ])
        );
        return this.data.source;
      });
    },
    filter: (datas: IShop[], args: SystemModuleShopCompareTableArgs) => {
      let filter = datas.filter((x) => {
        if (args.states.length > 0) {
          return args.states.includes(x.ObjectState);
        }
        return true;
      });
      return filter;
    },
    sort: {
      value: undefined as Sort | undefined,
      on: (datas: IShop[], sort: Sort) => {
        this.load.sort.value = sort;
        return datas.sort((a, b) => {
          let _a = a as any;
          let _b = b as any;

          return LocaleCompare.compare(
            _a[sort.active],
            _b[sort.active],
            sort.direction === 'asc'
          );
        });
      },
    },
    page: (index: number, size: number, datas: IShop[]) => {
      this.business.paged.load(index, size, [...datas]).then((x) => {
        this.page = x.Page;
        this.data.shop = x.Data;
        while (this.data.shop.length < size) {
          this.data.shop.push(undefined);
        }
      });
    },
  };
  onsort(sort: Sort) {
    let datas = this.load.filter(this.data.source.shop, this.args);
    datas = this.load.sort.on(datas, sort);
    this.load.page(this.page.PageIndex, this.page.PageSize, datas);
  }

  oninfo(data: IShop, e: Event) {
    this.info.emit(data);
    e.stopImmediatePropagation();
  }
  onsign(e: Event, data: IShop) {
    this.sign.emit(data);
    if (this.selected === data) {
      e.stopImmediatePropagation();
    }
  }
  oncompare(e: Event, index: number, item?: IShop) {
    if (item === this.selected) {
      e.stopImmediatePropagation();
    }

    if (item) {
      let result = this.data.source.result.find((x) => x.Shop?.Id === item.Id);
      if (result) {
        let paged = new Paged<ShopTaskCompareResult>();
        paged.Data = result;
        paged.Page = new Page();
        paged.Page.PageCount = this.page.TotalRecordCount;
        paged.Page.PageIndex =
          this.page.PageSize * (this.page.PageIndex - 1) + index + 1;
        paged.Page.PageSize = 1;
        paged.Page.RecordCount = 1;
        paged.Page.TotalRecordCount = this.page.TotalRecordCount;

        this.compare.emit(paged);
      }
    }
  }
  onselect(data?: IShopViewModel) {
    if (!data) return;
    if (this.selected === data) {
      this.selected = undefined;
    } else {
      this.selected = data;
    }
    this.selectedChange.emit(this.selected);
  }
  onpage(index: number) {
    let datas = this.load.filter(this.data.source.shop, this.args);
    this.load.page(index, this.page.PageSize, datas);
  }

  picture = {
    get: (id: string) => {
      return this.business.medium.picture(id);
    },
    on: (e: Event, index: number, item?: IShop) => {
      if (item === this.selected) {
        e.stopImmediatePropagation();
      }

      if (item) {
        let paged = new Paged<IShop>();
        paged.Data = item;
        paged.Page = new Page();
        paged.Page.PageCount = this.page.TotalRecordCount;
        paged.Page.PageIndex =
          this.page.PageSize * (this.page.PageIndex - 1) + index + 1;
        paged.Page.PageSize = 1;
        paged.Page.RecordCount = 1;
        paged.Page.TotalRecordCount = this.page.TotalRecordCount;
        this._picture.emit(paged);
      }
    },
  };

  disabled = {
    details: (data: IShop) => {
      if (data instanceof ShopRegistration) {
        return true;
      }
      return false;
    },
    compare: (data: IShop) => {
      if (data.ObjectState === ShopObjectState.Existed) {
        return false;
      }
      return true;
    },
  };
}
