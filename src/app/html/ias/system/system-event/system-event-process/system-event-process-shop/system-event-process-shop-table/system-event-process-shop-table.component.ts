import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { TableSorterDirective } from '../../../../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../../../../common/directives/table-sorter/table-sorter.model';
import { LocaleCompare } from '../../../../../../../common/tools/compare-tool/compare.tool';
import { Language } from '../../../../../../../common/tools/language-tool/language';
import { PromiseValue } from '../../../../../../../common/view-models/value.promise';
import { SystemEventProcessShopTableBusiness } from './system-event-process-shop-table.business';
import {
  SystemEventProcessShopTableArgs,
  SystemEventProcessShopTableFilter,
} from './system-event-process-shop-table.model';

@Component({
  selector: 'ias-system-event-process-shop-table',
  imports: [CommonModule, TableSorterDirective],
  templateUrl: './system-event-process-shop-table.component.html',
  styleUrl: './system-event-process-shop-table.component.less',
  providers: [SystemEventProcessShopTableBusiness],
})
export class SystemEventProcessShopTableComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() args = new SystemEventProcessShopTableArgs();
  @Input('load') _load?: EventEmitter<SystemEventProcessShopTableArgs>;
  @Input() selected?: ShopRegistration;
  @Output() selectedChange = new EventEmitter<ShopRegistration>();
  @Output() loaded = new EventEmitter<ShopRegistration[]>();

  constructor(private business: SystemEventProcessShopTableBusiness) {}

  @ViewChild('body') _body?: ElementRef<HTMLDivElement>;

  clecked = false;
  datas: ShopRegistration[] = [];
  widths = ['50px', '50px', 'auto', '100px', 'auto', '100px'];
  Language = Language;
  sort: Sort = {
    active: 'GPSDistance',
    direction: 'asc',
  };

  private filter = new SystemEventProcessShopTableFilter();
  private subscription = new Subscription();
  private body = new PromiseValue<HTMLDivElement>();

  ngOnInit(): void {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.filter = {
          ...this.filter,
          ...x,
        };
        this.load(this.filter);
      });
      this.subscription.add(sub);
    }
    this.load(this.filter);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.args(changes['args']);
    this.change.selected(changes['selected']);
  }
  ngAfterViewInit(): void {
    if (this._body) {
      this.body.set(this._body.nativeElement);
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  private change = {
    args: (change: SimpleChange) => {
      if (change) {
        this.filter = {
          ...this.filter,
          ...this.args,
        };

        if (!change.firstChange) {
          this.load(this.filter);
        }
      }
    },
    selected: (change: SimpleChange) => {
      if (change) {
        if (this.clecked) {
          this.clecked = false;
          return;
        }
        if (this.selected && this.datas.length > 0) {
          let index = this.datas.findIndex((x) => x.Id === this.selected?.Id);
          if (index >= 0) {
            this.scroll(index, this.datas.length);
          }
        }
      }
    },
  };
  private scroll(index: number, size: number) {
    this.body.get().then((body) => {
      let top = body.scrollHeight * (index / size);
      body.scrollTop = top;
    });
  }
  private load(filter: SystemEventProcessShopTableFilter) {
    this.business.load(filter).then((x) => {
      this.datas = x;
      this.on.sort(this.sort);
      this.loaded.emit(this.datas);
    });
  }

  on = {
    select: (item: ShopRegistration) => {
      this.clecked = true;
      this.selected = item;
      this.selectedChange.emit(this.selected);
    },
    sort: (sort: Sort) => {
      this.sort = sort;
      this.datas = this.datas.sort((a, b) => {
        let _a: any = a;
        let _b: any = b;
        return LocaleCompare.compare(
          _a[sort.active],
          _b[sort.active],
          sort.direction === 'asc'
        );
      });
    },
  };
}
