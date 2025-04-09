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
import { IShop } from '../../../../common/data-core/models/arm/analysis/shop.interface';
import { Page } from '../../../../common/data-core/models/page-list.model';
import { ColorTool } from '../../../../common/tools/color/color.tool';
import {
  GeoDirection,
  GeoDirectionSort,
} from '../../../../common/tools/geo-tool/geo.model';
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
  @Input('datas') shops: IShop[] = [];
  @Output() details = new EventEmitter<IShop>();
  @Input() selected?: IShop;
  @Output() selectedChange = new EventEmitter<IShop>();
  @Output() itemhover = new EventEmitter<IShop>();
  @Output() itemblur = new EventEmitter<IShop>();
  @Output() position = new EventEmitter<IShop>();
  @Input('sort') _sort?: EventEmitter<GeoDirectionSort>;

  constructor(private business: SystemMapSourceTableShopBusiness) {}

  widths = ['70px', 'auto', '100px', '70px', '8px'];
  datas: SystemMapSourceTableShopItem[] = [];
  page = Page.create(1, 10);
  private sort = new GeoDirectionSort();
  private direction = GeoDirection.ew;

  Color = ColorTool;

  ngOnChanges(changes: SimpleChanges): void {
    this.changeshops(changes['shops']);
  }

  ngOnInit(): void {
    if (this._sort) {
      this._sort.subscribe((x) => {
        if (this.sort.latitude !== x.latitude) {
          this.direction = GeoDirection.ns;
        } else if (this.sort.longitude !== x.longitude) {
          this.direction = GeoDirection.ew;
        }
        this.sort.latitude = x.latitude;
        this.sort.longitude = x.longitude;
        this.load(
          this.page.PageIndex,
          this.page.PageSize,
          this.shops,
          this.sort,
          this.direction
        );
      });
    }
  }

  changeshops(change: SimpleChange) {
    if (change) {
      this.load(1, this.page.PageSize, this.shops, this.sort, this.direction);
    }
  }

  private async load(
    index: number,
    size: number,
    shops: IShop[],
    sort: GeoDirectionSort,
    direction: GeoDirection
  ) {
    return this.business
      .load(index, size, [...shops], sort, direction)
      .then((x) => {
        this.datas = x.Data;
        this.page = x.Page;
        return this.datas;
      });
  }

  onselect(item: IShop) {
    this.selected = item;
    this.selectedChange.emit(item);
  }

  ondetails(data: IShop, e: Event) {
    this.details.emit(data);
    if (this.selected === data) {
      e.stopImmediatePropagation();
    }
  }
  onmouseover(data: IShop) {
    this.itemhover.emit(data);
  }
  onmouseout(data: IShop) {
    this.itemblur.emit(data);
  }
  onposition(data: IShop, e: Event) {
    this.position.emit(data);
    if (this.selected === data) {
      e.stopImmediatePropagation();
    }
  }

  onpage(num: number) {
    this.load(num, this.page.PageSize, this.shops, this.sort, this.direction);
  }
}
