import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorComponent } from '../../../../common/components/paginator/paginator.component';
import { Page } from '../../../../common/data-core/models/page-list.model';
import { LocalStorage } from '../../../../common/storage/local.storage';
import { ISystemModuleShopStorage } from '../../../../common/storage/system-module-storage/system-module-shop.storage';
import { SystemModuleShopListItemComponent } from '../system-module-shop-list-item/system-module-shop-list-item.component';
import { SystemModuleShopTableBusiness } from '../system-module-shop-table/system-module-shop-table.business';
import { SystemModuleShopTableConverter } from '../system-module-shop-table/system-module-shop-table.converter';
import {
  ShopModel,
  SystemModuleShopTableArgs,
  SystemModuleShopTableFilter,
} from '../system-module-shop-table/system-module-shop-table.model';

@Component({
  selector: 'ias-system-module-shop-list',
  imports: [
    CommonModule,
    PaginatorComponent,
    SystemModuleShopListItemComponent,
  ],
  templateUrl: './system-module-shop-list.component.html',
  styleUrl: './system-module-shop-list.component.less',
  providers: [SystemModuleShopTableBusiness, SystemModuleShopTableConverter],
})
export class SystemModuleShopListComponent {
  @Input() args = new SystemModuleShopTableArgs();
  @Input('load') _load?: EventEmitter<SystemModuleShopTableArgs>;
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
  page = Page.create(1, 8);
  datas: ShopModel[] = [];
  selected?: ShopModel;

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
    this.business
      .load(index, size, filter, false)
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
}
