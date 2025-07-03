import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ShopRegistrationTaskDetectedResult } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration-task-detected-result.model';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { TableSorterDirective } from '../../../../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../../../../common/directives/table-sorter/table-sorter.model';
import { LocaleCompare } from '../../../../../../../common/tools/compare-tool/compare.tool';
import { SystemTaskShopRegistrationTableBusiness } from './business/system-task-shop-registration-table.business';
import { SystemTaskShopRegistrationTableArgs } from './system-task-shop-registration-table.model';

@Component({
  selector: 'ias-system-task-shop-registration-table',
  imports: [CommonModule, TableSorterDirective],
  templateUrl: './system-task-shop-registration-table.component.html',
  styleUrl: './system-task-shop-registration-table.component.less',
  providers: [SystemTaskShopRegistrationTableBusiness],
})
export class SystemTaskShopRegistrationTableComponent
  implements OnInit, OnDestroy
{
  @Input() args = new SystemTaskShopRegistrationTableArgs();
  @Input('load') _load?: EventEmitter<SystemTaskShopRegistrationTableArgs>;
  @Input() selected?: ShopRegistrationTaskDetectedResult;
  @Output() selectedChange =
    new EventEmitter<ShopRegistrationTaskDetectedResult>();
  @Output() video = new EventEmitter<ShopRegistration>();

  constructor(private business: SystemTaskShopRegistrationTableBusiness) {}

  widths: string[] = ['10%', 'auto', '25%', '15%', '10%'];
  datas: ShopRegistrationTaskDetectedResult[] = [];
  loading = false;
  private subscription = new Subscription();

  ngOnInit(): void {
    if (this._load) {
      let sub = this._load.subscribe((args) => {
        this.args = args;
        this.load(this.args);
      });
      this.subscription.add(sub);
    }
    this.load(this.args);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private async load(args: SystemTaskShopRegistrationTableArgs) {
    this.loading = true;
    try {
      this.datas = await this.business.load(args);
      this.table.count = this.business.count;

      this.sort.on.table(this.sort.data);
      if (this.datas.length > 0) {
        this.on.select(this.datas[0]);
      }
    } finally {
      this.loading = false;
    }
  }

  table = {
    count: {
      all: 0,
      detected: 0,
      undetected: 0,
    },
  };

  on = {
    select: (item: ShopRegistrationTaskDetectedResult) => {
      this.selected = item;
      this.selectedChange.emit(this.selected);
    },
    video: (item: ShopRegistration, e: Event) => {
      this.video.emit(item);
      if (this.selected === item) {
        e.stopPropagation();
      }
    },
  };

  sort = {
    data: {
      active: 'Detected',
      direction: 'asc',
    } as Sort,
    on: {
      table: (sort: Sort) => {
        this.sort.data = sort;
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
    },
  };
}
