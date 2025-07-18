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
import { Shop } from '../../../../../../../common/data-core/models/arm/analysis/shop.model';
import { TableSorterDirective } from '../../../../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../../../../common/directives/table-sorter/table-sorter.model';
import { LocaleCompare } from '../../../../../../../common/tools/compare-tool/compare.tool';
import { GeoDirectionSort } from '../../../../../../../common/tools/geo-tool/geo.model';
import { Language } from '../../../../../../../common/tools/language-tool/language';
import { ShopStatisticStatus } from '../../../system-task-route/system-task-route-statistic/system-task-route-statistic.model';
import { SystemTaskShopAnalysisTableShopAnalysisService } from './business/service/system-task-shop-analysis-table-shop-analysis.service';
import { SystemTaskShopAnalysisTableShopRegistrationService } from './business/service/system-task-shop-analysis-table-shop-registration.service';
import { SystemTaskShopAnalysisTableShopService } from './business/service/system-task-shop-analysis-table-shop.service';
import { SystemTaskShopAnalysisTableBusiness } from './business/system-task-shop-analysis-table.business';
import {
  ISystemTaskShopAnalysisTableItem,
  SystemTaskShopAnalysisTableArgs,
} from './system-task-shop-analysis-table.model';

@Component({
  selector: 'ias-system-task-shop-analysis-table',
  imports: [CommonModule, TableSorterDirective],
  templateUrl: './system-task-shop-analysis-table.component.html',
  styleUrl: './system-task-shop-analysis-table.component.less',
  providers: [
    SystemTaskShopAnalysisTableBusiness,
    SystemTaskShopAnalysisTableShopService,
    SystemTaskShopAnalysisTableShopRegistrationService,
    SystemTaskShopAnalysisTableShopAnalysisService,
  ],
})
export class SystemTaskShopAnalysisTableComponent implements OnInit, OnDestroy {
  @Input() args = new SystemTaskShopAnalysisTableArgs();
  @Input('load') _load?: EventEmitter<SystemTaskShopAnalysisTableArgs>;
  @Input() selected?: ISystemTaskShopAnalysisTableItem;
  @Output() selectedChange =
    new EventEmitter<ISystemTaskShopAnalysisTableItem>();
  @Output() video = new EventEmitter<ISystemTaskShopAnalysisTableItem>();
  @Output() loaded = new EventEmitter<ISystemTaskShopAnalysisTableItem[]>();

  constructor(private business: SystemTaskShopAnalysisTableBusiness) {}

  widths: string[] = ['10%', 'auto', '15%', '15%', '91px', '10%'];
  datas: ISystemTaskShopAnalysisTableItem[] = [];
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

  private async load(args: SystemTaskShopAnalysisTableArgs) {
    this.loading = true;
    try {
      let datas = await this.business.load(args);
      this.loaded.emit(datas);
      this.table.count = this.business.count;
      this.datas = datas;
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
      discover: 0,
      misinfo: 0,
    },
    status: (item: Shop) => {
      if (item.Marking) {
        return Language.ShopStatisticStatus(ShopStatisticStatus.misinfo);
      }
      if (item.RegistrationId) {
        return Language.ShopStatisticStatus(ShopStatisticStatus.detected);
      }
      return Language.ShopStatisticStatus(ShopStatisticStatus.discover);
    },
  };

  on = {
    select: (item: ISystemTaskShopAnalysisTableItem) => {
      this.selected = item;
      this.selectedChange.emit(this.selected);
    },

    video: (item: ISystemTaskShopAnalysisTableItem, e: Event) => {
      this.video.emit(item);
      if (this.selected === item) {
        e.stopPropagation();
      }
    },
  };

  sort = {
    data: {
      active: 'Status',
      direction: 'desc',
    } as Sort,
    on: {
      table: (sort: Sort) => {
        this.sort.data = sort;
        this.datas = this.datas.sort((a, b) => {
          switch (sort.active) {
            case 'Registration':
              return LocaleCompare.compare(
                a.registration?.Name,
                b.registration?.Name,
                sort.direction === 'asc'
              );
            case 'Status':
              return (
                LocaleCompare.compare(
                  a.shop.Marking,
                  b.shop.Marking,
                  sort.direction === 'asc'
                ) ||
                LocaleCompare.compare(
                  a.shop.RegistrationId,
                  b.shop.RegistrationId,
                  sort.direction === 'asc'
                )
              );
            default:
              break;
          }

          let _a: any = a.shop;
          let _b: any = b.shop;
          return LocaleCompare.compare(
            _a[sort.active],
            _b[sort.active],
            sort.direction === 'asc'
          );
        });
      },
      road: (sort: GeoDirectionSort) => {
        sort.latitude;
      },
    },
  };
}
