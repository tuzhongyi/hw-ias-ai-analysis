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
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { Page } from '../../../../common/data-core/models/page-list.model';
import { ShopViewModel } from '../../../../common/view-models/shop/shop.view-model';
import { SystemTaskResultShopTableBusiness } from './system-task-result-shop-table.business';
import {
  SystemTaskResultShopTableArgs,
  SystemTaskResultShopTableFilter,
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

  constructor(private business: SystemTaskResultShopTableBusiness) {}

  @ViewChild('body') body?: ElementRef<HTMLDivElement>;
  datas: ShopViewModel[] = [];
  widths: string[] = ['65px', 'auto', 'auto', '86px'];

  private filter = new SystemTaskResultShopTableFilter();
  private subscription = new Subscription();

  ngOnInit(): void {
    if (this.index) {
      let sub = this.index.subscribe((index) => {
        this.selected = this.datas[index - 1];
        this.selectedChange.emit(this.selected);
        this.page.emit(Page.create(index, 1, this.datas.length));
        this.scroll(index - 1, this.datas.length);
      });
      this.subscription.add(sub);
    }
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.load(x);
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
  }
}
