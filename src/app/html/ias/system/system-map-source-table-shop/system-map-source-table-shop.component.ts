import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { PaginatorComponent } from '../../../../common/components/paginator/paginator.component';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { Page } from '../../../../common/data-core/models/page-list.model';
import { TableSorterDirective } from '../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../common/directives/table-sorter/table-sorter.model';
import { ColorTool } from '../../../../common/tools/color/color.tool';
import { LocaleCompare } from '../../../../common/tools/compare-tool/compare.tool';
import { SystemMapSourceTableShopBusiness } from './system-map-source-table-shop.business';
import {
  SystemMapSourceTableShopFilter,
  SystemMapSourceTableShopItem,
} from './system-map-source-table-shop.model';

@Component({
  selector: 'ias-system-map-source-table-shop',
  imports: [CommonModule, TableSorterDirective, PaginatorComponent],
  templateUrl: './system-map-source-table-shop.component.html',
  styleUrl: './system-map-source-table-shop.component.less',
  providers: [SystemMapSourceTableShopBusiness],
})
export class SystemMapSourceTableShopComponent implements OnChanges {
  @Input('datas') shops: Shop[] = [];
  @Output() details = new EventEmitter<Shop>();
  @Input() selected?: Shop;
  @Output() selectedChange = new EventEmitter<Shop>();
  @Output() itemhover = new EventEmitter<Shop>();
  @Output() itemblur = new EventEmitter<Shop>();
  @Output() position = new EventEmitter<Shop>();

  constructor(private business: SystemMapSourceTableShopBusiness) {}

  widths = ['70px', 'auto', '100px', '70px', '8px'];
  filter = new SystemMapSourceTableShopFilter();
  datas: SystemMapSourceTableShopItem[] = [];
  page = Page.create(1, 10);

  Color = ColorTool;

  ngOnChanges(changes: SimpleChanges): void {
    this.changeshops(changes['shops']);
  }

  changeshops(change: SimpleChange) {
    if (change) {
      this.filter.ids = this.shops.map((x) => x.Id);
      this.load(1, this.page.PageSize, this.filter);
    }
  }

  private load(
    index: number,
    size: number,
    filter: SystemMapSourceTableShopFilter
  ) {
    this.business.load(index, size, filter).then((x) => {
      this.datas = x.Data;
      this.page = x.Page;
    });
  }

  onselect(item: Shop) {
    this.selected = item;
    this.selectedChange.emit(item);
  }

  ondetails(data: Shop, e: Event) {
    this.details.emit(data);
    if (this.selected === data) {
      e.stopImmediatePropagation();
    }
  }
  onmouseover(data: Shop) {
    this.itemhover.emit(data);
  }
  onmouseout(data: Shop) {
    this.itemblur.emit(data);
  }
  onposition(data: Shop, e: Event) {
    this.position.emit(data);
    if (this.selected === data) {
      e.stopImmediatePropagation();
    }
  }

  onsort(sort: Sort) {
    this.datas = this.datas.sort((a: any, b: any) => {
      return LocaleCompare.compare(
        a[sort.active],
        b[sort.active],
        sort.direction === 'asc'
      );
    });
    this.filter.asc = undefined;
    this.filter.desc = undefined;
    if (sort.direction === 'asc') {
      this.filter.asc = sort.active;
    } else {
      this.filter.desc = sort.active;
    }
    this.load(this.page.PageIndex, this.page.PageSize, this.filter);
  }
  onpage(num: number) {
    if (this.filter) {
      this.load(num, this.page.PageSize, this.filter);
    }
  }
}
