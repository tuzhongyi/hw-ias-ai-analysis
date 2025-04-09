import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { Page } from '../../../../../../common/data-core/models/page-list.model';
import { ArrayTool } from '../../../../../../common/tools/array-tool/array.tool';
import {
  GeoDirection,
  GeoDirectionSort,
} from '../../../../../../common/tools/geo-tool/geo.model';
import { GeoTool } from '../../../../../../common/tools/geo-tool/geo.tool';
import { ShopViewModel } from '../../../../../../common/view-models/shop/shop.view-model';
import { SystemTaskResultShopTableBusiness } from './system-task-result-shop-table.business';
import {
  SystemTaskResultShopTableArgs,
  SystemTaskResultShopTableFilter,
  SystemTaskResultShopTableItem,
} from './system-task-result-shop-table.model';

@Component({
  selector: 'ias-system-task-result-shop-table',
  imports: [CommonModule],
  templateUrl: './system-task-result-shop-table.component.html',
  styleUrl: './system-task-result-shop-table.component.less',
  providers: [SystemTaskResultShopTableBusiness],
})
export class SystemTaskResultShopTableComponent implements OnInit, OnDestroy {
  @Input() args?: SystemTaskResultShopTableArgs;
  @Input('load') _load?: EventEmitter<SystemTaskResultShopTableArgs>;
  @Input() selected?: Shop;
  @Output() selectedChange = new EventEmitter<Shop>();
  @Input() index?: EventEmitter<number>;
  @Output() page = new EventEmitter<Page>();
  @Output() error = new EventEmitter<Error>();
  @Input('sort') _sort?: EventEmitter<GeoDirectionSort>;

  constructor(private business: SystemTaskResultShopTableBusiness) {}

  @ViewChild('body') body?: ElementRef<HTMLDivElement>;
  datas: SystemTaskResultShopTableItem[] = [];
  widths: string[] = ['65px', 'auto', 'auto', '86px'];

  private filter = new SystemTaskResultShopTableFilter();
  private subscription = new Subscription();
  private selectclicked = false;

  ngOnInit(): void {
    if (this.index) {
      let sub = this.index.subscribe((index) => {
        this.selected = this.datas[index - 1];
        this.selectedChange.emit(this.selected);
        this.page.emit(Page.create(index, 1, this.datas.length));
        if (!this.selectclicked) {
          this.scroll(index - 1, this.datas.length);
        }
      });
      this.subscription.add(sub);
    }
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.load(x);
      });
      this.subscription.add(sub);
    }
    if (this._sort) {
      let sub = this._sort.subscribe((x) => {
        this.sort(x);
      });
      this.subscription.add(sub);
    }
    if (this.args) {
      this.load(this.args);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load(args: SystemTaskResultShopTableArgs) {
    this.filter.load(args);
    this.business
      .load(this.filter)
      .then((x) => {
        this.datas = x;
        if (this.datas.length > 0) {
          this.onselect(this.datas[0], 0);
        } else {
          this.selected = undefined;
          this.selectedChange.emit(undefined);
        }
      })
      .catch((e) => this.error.emit(e));
  }
  private scroll(index: number, size: number) {
    if (this.body) {
      this.body.nativeElement.scrollTop =
        this.body.nativeElement.scrollHeight * (index / size);
    }
  }

  onselect(item: ShopViewModel, index: number) {
    if (this.selected === item) {
      return;
    }
    this.selected = item;
    this.selectedChange.emit(item);
    this.page.emit(Page.create(index + 1, 1, this.datas.length));
    this.selectclicked = true;
    setTimeout(() => {
      this.selectclicked = false;
    }, 50);
  }

  sort(sort: GeoDirectionSort) {
    let group = ArrayTool.groupBy(this.datas, (x) => {
      return x.Road?.Id ?? '';
    });

    let sorteds: SystemTaskResultShopTableItem[] = [];

    for (let key in group) {
      let items = group[key];
      let sorted = items.sort((a, b) => this.compare(a, b, sort));
      sorteds.push(...sorted);
    }

    this.datas = [...sorteds];
  }

  private compare(
    a: SystemTaskResultShopTableItem,
    b: SystemTaskResultShopTableItem,
    sort: GeoDirectionSort
  ) {
    if (a.Location && a.Road && b.Location && b.Road) {
      let _a: [number, number] = [a.Location.Longitude, a.Location.Latitude];
      let _b: [number, number] = [b.Location.Longitude, b.Location.Latitude];

      switch (a.Road.Direction) {
        case GeoDirection.ew:
          return GeoTool.point.sort.longitude(_a, _b, sort.longitude);
        case GeoDirection.ns:
          return GeoTool.point.sort.latitude(_a, _b, sort.latitude);
        default:
          throw new Error('Road.direction');
      }
    }
    return 0;
  }
}
