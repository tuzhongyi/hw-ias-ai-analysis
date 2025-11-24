import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShopTaskStatistic } from '../../../../../../common/data-core/models/arm/analysis/task/shop-task-statistic.model';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import {
  Duration,
  DurationUnit,
} from '../../../../../../common/tools/date-time-tool/duration.model';
import { SystemMainCardContainerComponent } from '../system-main-card-container/system-main-card-container.component';
import { SystemMainCardShopStatisticBusiness } from './business/system-main-card-shop-statistic.business';

@Component({
  selector: 'ias-system-main-card-shop-statistic',
  imports: [CommonModule, FormsModule, SystemMainCardContainerComponent],
  templateUrl: './system-main-card-shop-statistic.component.html',
  styleUrl: './system-main-card-shop-statistic.component.less',
  providers: [SystemMainCardShopStatisticBusiness],
})
export class SystemMainCardShopStatisticComponent implements OnInit, OnDestroy {
  @Input('load') _load?: EventEmitter<void>;
  @Input() duration = DateTimeTool.all.year(new Date());
  @Output() durationChange = new EventEmitter<Duration>();

  constructor(private business: SystemMainCardShopStatisticBusiness) {}

  title = '商铺状态';
  data?: ShopTaskStatistic;
  count = 0;

  private subscription = new Subscription();

  ngOnInit(): void {
    this.regist();
    this.load();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private regist() {
    if (this._load) {
      this.subscription.add(
        this._load.subscribe(() => {
          this.load();
        })
      );
    }
  }
  private async load() {
    this.data = await this.business.load(this.duration);
    if (!this.data) {
      let shops = await this.business.registration();
      this.count = shops.length;
    }
  }

  unit = {
    value: DurationUnit.year,
    Type: DurationUnit,
    change: () => {
      let today = new Date();
      switch (this.unit.value) {
        case DurationUnit.year:
          this.duration = DateTimeTool.all.year(today);
          break;
        case DurationUnit.month:
          this.duration = DateTimeTool.all.month(today);
          break;
        case DurationUnit.week:
          this.duration = DateTimeTool.all.week(today);
          break;
        case DurationUnit.day:
          this.duration = DateTimeTool.all.day(today);
          break;

        default:
          break;
      }
      this.load();
      this.durationChange.emit(this.duration);
    },
  };
}
