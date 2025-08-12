import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ShopTaskStatistic } from '../../../../../../common/data-core/models/arm/analysis/task/shop-task-statistic.model';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { SystemMainCardContainerComponent } from '../system-main-card-container/system-main-card-container.component';
import { SystemMainCardShopStatisticBusiness } from './business/system-main-card-shop-statistic.business';

@Component({
  selector: 'ias-system-main-card-shop-statistic',
  imports: [CommonModule, SystemMainCardContainerComponent],
  templateUrl: './system-main-card-shop-statistic.component.html',
  styleUrl: './system-main-card-shop-statistic.component.less',
  providers: [SystemMainCardShopStatisticBusiness],
})
export class SystemMainCardShopStatisticComponent implements OnInit, OnDestroy {
  @Input('load') _load?: EventEmitter<void>;

  constructor(private business: SystemMainCardShopStatisticBusiness) {}

  title = '商铺状态';
  data?: ShopTaskStatistic;

  private duration = DateTimeTool.last.year(new Date());
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
  private load() {
    this.business.load(this.duration).then((x) => {
      this.data = x;
    });
  }
}
