import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorComponent } from '../../../../common/components/paginator/paginator.component';
import { Page } from '../../../../common/data-core/models/page-list.model';
import { TableSorterDirective } from '../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../common/directives/table-sorter/table-sorter.model';
import { ColorTool } from '../../../../common/tools/color/color.tool';
import { SystemModuleShopTableBusiness } from './system-module-shop-table.business';
import { SystemModuleShopTableConverter } from './system-module-shop-table.converter';
import {
  ShopModel,
  SystemModuleShopTableArgs,
  SystemModuleShopTableFilter,
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
  @Input('load') _load?: EventEmitter<SystemModuleShopTableArgs>;
  @Output() details = new EventEmitter<ShopModel>();

  constructor(private business: SystemModuleShopTableBusiness) {}

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
        this.filter.load(x);
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
    this.business.load(index, size, filter).then((x) => {
      this.datas = x.Data;
      this.page = x.Page;
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
