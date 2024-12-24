import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorComponent } from '../../../../common/components/paginator/paginator.component';
import { Page } from '../../../../common/data-core/models/page-list.model';
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
  imports: [DatePipe, CommonModule, PaginatorComponent],
  templateUrl: './system-module-shop-table.component.html',
  styleUrl: './system-module-shop-table.component.less',
  providers: [SystemModuleShopTableBusiness, SystemModuleShopTableConverter],
})
export class SystemModuleShopTableComponent implements OnInit {
  @Input() args = new SystemModuleShopTableArgs();
  @Input('load') _load?: EventEmitter<SystemModuleShopTableArgs>;
  @Output() inited = new EventEmitter<void>();
  @Output() details = new EventEmitter<ShopModel>();

  constructor(private business: SystemModuleShopTableBusiness) {}

  filter?: SystemModuleShopTableFilter;
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
        this.filter = {
          ...this.filter,
          ...x,
        };
        this.load(this.page.PageIndex, this.page.PageSize, this.filter);
      });
    }
    this.filter = {
      ...this.args,
    };
    this.inited.emit();
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
}
