import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginatorComponent } from '../../../../../../common/components/paginator/paginator.component';
import { Page } from '../../../../../../common/data-core/models/page-list.model';
import { TableSorterDirective } from '../../../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../../../common/directives/table-sorter/table-sorter.model';
import { LocalStorage } from '../../../../../../common/storage/local.storage';
import { ISystemModuleShopStorage } from '../../../../../../common/storage/system-module-storage/system-module-shop.storage';
import { ColorTool } from '../../../../../../common/tools/color/color.tool';
import { Language } from '../../../../../../common/tools/language';
import { ShopViewModel } from '../../../../../../common/view-models/shop/shop.view-model';
import { SystemModuleShopTableBusiness } from './business/system-module-shop-table.business';
import { SystemModuleShopTableProviders } from './business/system-module-shop-table.provider';
import {
  SystemModuleShopTableArgs,
  SystemModuleShopTableFilter,
  SystemModuleShopTableItem,
  SystemModuleShopTableLoadArgs,
} from './system-module-shop-table.model';

@Component({
  selector: 'ias-system-module-shop-table',
  imports: [DatePipe, CommonModule, PaginatorComponent, TableSorterDirective],
  templateUrl: './system-module-shop-table.component.html',
  styleUrl: './system-module-shop-table.component.less',
  providers: [...SystemModuleShopTableProviders],
})
export class SystemModuleShopTableComponent implements OnInit, OnDestroy {
  @Input() args = new SystemModuleShopTableArgs();
  @Input('load') _load?: EventEmitter<SystemModuleShopTableLoadArgs>;
  @Output() details = new EventEmitter<ShopViewModel>();
  @Output() info = new EventEmitter<ShopViewModel>();
  @Output() error = new EventEmitter<Error>();

  constructor(
    private business: SystemModuleShopTableBusiness,
    private local: LocalStorage
  ) {
    this.storage = this.local.system.module.shop.get();
    this.page.PageIndex = this.storage.page?.list ?? 1;
  }

  page = Page.create(1, 10);
  datas: SystemModuleShopTableItem[] = [];
  selected?: SystemModuleShopTableItem;
  widths = [
    '5%',
    '5%',
    '5%',
    '15%',
    '15%',
    '8%',
    '8%',
    '8%',
    '7%',
    '10%',
    '10%',
    '6%',
  ];

  Color = ColorTool;
  Language = Language;

  private storage: ISystemModuleShopStorage;
  private filter = new SystemModuleShopTableFilter();
  private subscription = new Subscription();

  ngOnInit(): void {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.filter.load(x.args);
        if (x.reset) {
          this.page.PageIndex = 1;
        }
        this.load(this.page.PageIndex, this.page.PageSize, this.filter);
      });
      this.subscription.add(sub);
    }

    this.filter.load(this.args);
    this.filter.desc = 'EndTime';
    this.load(this.page.PageIndex, this.page.PageSize, this.filter);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load(
    index: number,
    size: number,
    filter: SystemModuleShopTableFilter
  ) {
    this.business
      .load(index, size, filter, true)
      .then((x) => {
        this.datas = x.Data;
        this.page = x.Page;
        this.storage.page.list = this.page.PageIndex;
        this.local.system.module.shop.set(this.storage);
      })
      .catch((e) => {
        this.error.emit(e);
      });
  }

  onpage(num: number) {
    if (this.filter) {
      this.load(num, this.page.PageSize, this.filter);
    }
  }
  onselect(item: SystemModuleShopTableItem) {
    if (this.selected === item) {
      this.selected = undefined;
    } else {
      this.selected = item;
    }
  }

  onsort(sort: Sort) {
    this.filter.asc = undefined;
    this.filter.desc = undefined;
    switch (sort.direction) {
      case 'asc':
        this.filter.asc = sort.active;
        break;
      case 'desc':
        this.filter.desc = sort.active;
        break;
      default:
        break;
    }
    this.load(this.page.PageIndex, this.page.PageSize, this.filter);
  }

  ondetails(item: SystemModuleShopTableItem, e: Event) {
    this.details.emit(item);
    if (this.selected === item) {
      e.stopPropagation();
    }
  }

  oninfo(item: SystemModuleShopTableItem, e: Event) {
    this.info.emit(item);
    if (this.selected === item) {
      e.stopPropagation();
    }
  }
}
