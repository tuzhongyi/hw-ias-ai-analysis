import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorComponent } from '../../../../common/components/paginator/paginator.component';
import { Page } from '../../../../common/data-core/models/page-list.model';
import { TableSorterDirective } from '../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../common/directives/table-sorter/table-sorter.model';
import { LocalStorage } from '../../../../common/storage/local.storage';
import { ISystemModuleShopStorage } from '../../../../common/storage/system-module-storage/system-module-shop.storage';
import { ColorTool } from '../../../../common/tools/color/color.tool';
import { SystemModuleShopTableBusiness } from './system-module-shop-table.business';
import { SystemModuleShopTableConverter } from './system-module-shop-table.converter';
import {
  ShopModel,
  SystemModuleShopTableArgs,
  SystemModuleShopTableFilter,
  SystemModuleShopTableLoadArgs,
} from './system-module-shop-table.model';

@Component({
  selector: 'ias-system-module-shop-table',
  imports: [DatePipe, CommonModule, PaginatorComponent, TableSorterDirective],
  templateUrl: './system-module-shop-table.component.html',
  styleUrl: './system-module-shop-table.component.less',
  providers: [SystemModuleShopTableBusiness, SystemModuleShopTableConverter],
})
export class SystemModuleShopTableComponent implements OnInit {
  @Input() args = new SystemModuleShopTableArgs();
  @Input('load') _load?: EventEmitter<SystemModuleShopTableLoadArgs>;
  @Output() details = new EventEmitter<ShopModel>();
  @Output() error = new EventEmitter<Error>();

  constructor(
    private business: SystemModuleShopTableBusiness,
    private local: LocalStorage
  ) {
    this.storage = this.local.system.module.shop.get();
    this.page.PageIndex = this.storage.page?.list ?? 1;
  }

  storage: ISystemModuleShopStorage;
  filter = new SystemModuleShopTableFilter();
  page = Page.create(1, 10);
  datas: ShopModel[] = [];
  selected?: ShopModel;
  widths = [
    '5%',
    '5%',
    '5%',
    '16%',
    '15%',
    '10%',
    '10%',
    '10%',
    '10%',
    '10%',
    '6%',
  ];

  Color = ColorTool;

  ngOnInit(): void {
    if (this._load) {
      this._load.subscribe((x) => {
        this.filter.load(x.args);
        if (x.reset) {
          this.page.PageIndex = 1;
        }
        this.load(this.page.PageIndex, this.page.PageSize, this.filter);
      });
    }
    this.filter.load(this.args);
    this.load(this.page.PageIndex, this.page.PageSize, this.filter);
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
  onselect(item: ShopModel) {
    if (this.selected === item) {
      this.selected = undefined;
    } else {
      this.selected = item;
    }
  }

  ondetails(item: ShopModel, e: Event) {
    this.details.emit(item);
    if (this.selected === item) {
      e.stopPropagation();
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
}
