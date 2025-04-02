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
import { PaginatorComponent } from '../../../../common/components/paginator/paginator.component';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { Page } from '../../../../common/data-core/models/page-list.model';
import { ColorTool } from '../../../../common/tools/color/color.tool';
import { GeoDirectionSort } from '../../../../common/tools/geo-tool/geo.model';
import { SystemMapSourceTableShopBusiness } from './business/system-map-source-table-shop.business';
import { SystemMapSourceTableShopConverter } from './business/system-map-source-table-shop.converter';
import { SystemMapSourceTableShopItem } from './system-map-source-table-shop.model';

@Component({
  selector: 'ias-system-map-source-table-shop',
  imports: [CommonModule, PaginatorComponent],
  templateUrl: './system-map-source-table-shop.component.html',
  styleUrl: './system-map-source-table-shop.component.less',
  providers: [
    SystemMapSourceTableShopConverter,
    SystemMapSourceTableShopBusiness,
  ],
})
export class SystemMapSourceTableShopComponent implements OnInit, OnChanges {
  @Input('datas') shops: Shop[] = [];
  @Output() details = new EventEmitter<Shop>();
  @Input() selected?: Shop;
  @Output() selectedChange = new EventEmitter<Shop>();
  @Output() itemhover = new EventEmitter<Shop>();
  @Output() itemblur = new EventEmitter<Shop>();
  @Output() position = new EventEmitter<Shop>();
  @Input('sort') _sort?: EventEmitter<GeoDirectionSort>;

  constructor(private business: SystemMapSourceTableShopBusiness) {}

  widths = ['70px', 'auto', '100px', '70px', '8px'];
  datas: SystemMapSourceTableShopItem[] = [];
  page = Page.create(1, 10);
  private sort = new GeoDirectionSort();

  Color = ColorTool;

  ngOnChanges(changes: SimpleChanges): void {
    this.changeshops(changes['shops']);
  }

  ngOnInit(): void {
    if (this._sort) {
      this._sort.subscribe((x) => {
        this.sort = x;
        this.load(
          this.page.PageIndex,
          this.page.PageSize,
          this.shops,
          this.sort
        );
      });
    }
  }

  changeshops(change: SimpleChange) {
    if (change) {
      this.load(1, this.page.PageSize, this.shops, this.sort);
    }
  }

  private async load(
    index: number,
    size: number,
    shops: Shop[],
    sort: GeoDirectionSort
  ) {
    return this.business.load(index, size, [...shops], sort).then((x) => {
      this.datas = x.Data;
      this.page = x.Page;
      return this.datas;
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

  onpage(num: number) {
    this.load(num, this.page.PageSize, this.shops, this.sort);
  }
}
