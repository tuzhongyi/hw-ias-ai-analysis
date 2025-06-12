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
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import {
  Page,
  Paged,
} from '../../../../../../common/data-core/models/page-list.model';
import { TableSorterDirective } from '../../../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../../../common/directives/table-sorter/table-sorter.model';
import { ColorTool } from '../../../../../../common/tools/color/color.tool';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { SystemModuleShopRegistrationTableBusiness } from './business/system-module-shop-registration-table.business';
import { SystemModuleShopRegistrationTableConverter } from './business/system-module-shop-registration-table.converter';
import {
  SystemModuleShopRegistrationTableArgs,
  SystemModuleShopRegistrationTableFilter,
  SystemModuleShopRegistrationTableItem,
} from './system-module-shop-registration-table.model';

@Component({
  selector: 'ias-system-module-shop-registration-table',
  imports: [DatePipe, CommonModule, PaginatorComponent, TableSorterDirective],
  templateUrl: './system-module-shop-registration-table.component.html',
  styleUrl: './system-module-shop-registration-table.component.less',
  providers: [
    SystemModuleShopRegistrationTableBusiness,
    SystemModuleShopRegistrationTableConverter,
  ],
})
export class SystemModuleShopRegistrationTableComponent
  implements OnInit, OnDestroy
{
  @Input() args = new SystemModuleShopRegistrationTableArgs();
  @Input('load') _load?: EventEmitter<SystemModuleShopRegistrationTableArgs>;
  @Output() error = new EventEmitter<Error>();
  @Output() picture = new EventEmitter<Paged<ShopRegistration>>();
  @Input() selecteds: ShopRegistration[] = [];
  @Output() selectedsChange = new EventEmitter<ShopRegistration[]>();
  @Output() info = new EventEmitter<ShopRegistration>();
  @Input('page') _page = new EventEmitter<number>();

  constructor(private business: SystemModuleShopRegistrationTableBusiness) {}

  page = Page.create(1, 10);
  datas: (SystemModuleShopRegistrationTableItem | undefined)[] = [];
  widths = ['4%', '8%', '10%', '20%', '20%', '8%', '15%', '10%', '5%'];
  filter = new SystemModuleShopRegistrationTableFilter();
  subscription = new Subscription();

  Color = ColorTool;
  Language = Language;

  ngOnInit(): void {
    if (this._load) {
      let sub = this._load.subscribe((args) => {
        this.filter = this.filter.load(args);
        this.load(this.page.PageIndex, this.page.PageSize, this.filter);
      });
      this.subscription.add(sub);
    }
    if (this._page) {
      let sub = this._page.subscribe((index) => {
        this.business.get(index, this.filter).then((x) => {
          let page = new Paged<ShopRegistration>();
          page.Page = x.Page;
          page.Data = x.Data[0];
          this.picture.emit(page);
        });
      });
      this.subscription.add(sub);
    }
    this.filter = this.filter.load(this.args);
    this.load(1, this.page.PageSize, this.filter);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  select = {
    on: (item?: SystemModuleShopRegistrationTableItem) => {
      if (!item) return;
      let index = this.selecteds.findIndex((x) => x.Id === item.Id);
      if (index < 0) {
        this.selecteds.push(item);
      } else {
        this.selecteds.splice(index, 1);
      }
      this.selectedsChange.emit(this.selecteds);
    },
    all: () => {
      if (this.selecteds.length === this.page.RecordCount) {
        this.selecteds = [];
      } else {
        this.selecteds = [];
        for (let i = 0; i < this.datas.length; i++) {
          const data = this.datas[i];
          if (data) {
            this.selecteds.push(data);
          }
        }
      }
      this.selectedsChange.emit(this.selecteds);
    },
    clear: () => {
      this.selecteds = [];
      this.selectedsChange.emit(this.selecteds);
    },
  };

  load(
    index: number,
    size: number,
    filter: SystemModuleShopRegistrationTableFilter
  ) {
    this.select.clear();
    this.business.load(index, size, filter).then((x) => {
      this.page = x.Page;

      this.datas = x.Data;
      while (this.datas.length < this.page.PageSize) {
        this.datas.push(undefined);
      }
    });
  }

  onpage(num: number) {
    if (this.filter) {
      this.load(num, this.page.PageSize, this.filter);
      this.selecteds = [];
      this.selectedsChange.emit(this.selecteds);
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

  onpicture(
    e: Event,
    index: number,
    item?: SystemModuleShopRegistrationTableItem
  ) {
    e.stopImmediatePropagation();
    if (item) {
      let paged = new Paged<ShopRegistration>();
      paged.Data = item;
      paged.Page = new Page();
      paged.Page.PageCount = this.page.TotalRecordCount;
      paged.Page.PageIndex =
        this.page.PageSize * (this.page.PageIndex - 1) + index + 1;
      paged.Page.PageSize = 1;
      paged.Page.RecordCount = 1;
      paged.Page.TotalRecordCount = this.page.TotalRecordCount;
      this.picture.emit(paged);
    }
  }
  oninfo(item: SystemModuleShopRegistrationTableItem, e: Event) {
    this.info.emit(item);
    e.stopImmediatePropagation();
  }
}
