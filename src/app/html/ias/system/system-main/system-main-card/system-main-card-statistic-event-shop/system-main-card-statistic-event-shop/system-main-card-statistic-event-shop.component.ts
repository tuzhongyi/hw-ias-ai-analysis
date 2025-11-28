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
import { ShopObjectState } from '../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ChartItem } from '../../../../../../../common/tools/chart-tool/chart.model';
import { ColorTool } from '../../../../../../../common/tools/color/color.tool';
import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';
import {
  Duration,
  DurationUnit,
} from '../../../../../../../common/tools/date-time-tool/duration.model';
import { SystemMainCardContainerComponent } from '../../system-main-card-container/system-main-card-container.component';
import { SystemMainCardStatisticEventShopChartComponent } from '../system-main-card-statistic-event-shop-chart/system-main-card-statistic-event-shop-chart.component';
import { SystemMainCardStatisticEventShopBusiness } from './system-main-card-statistic-event-shop.business';

@Component({
  selector: 'ias-system-main-card-statistic-event-shop',
  imports: [
    CommonModule,
    FormsModule,
    SystemMainCardContainerComponent,
    SystemMainCardStatisticEventShopChartComponent,
  ],
  templateUrl: './system-main-card-statistic-event-shop.component.html',
  styleUrl: './system-main-card-statistic-event-shop.component.less',
  providers: [SystemMainCardStatisticEventShopBusiness],
})
export class SystemMainCardStatisticEventShopComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  @Input() duration = DateTimeTool.all.month(new Date());
  @Output() durationChange = new EventEmitter<Duration>();
  @Output() type = new EventEmitter<number>();
  constructor(private business: SystemMainCardStatisticEventShopBusiness) {}
  title = '商铺事件统计';

  datas: ChartItem[] = [];
  color = [
    ColorTool.ShopObjectState(ShopObjectState.Created),
    ColorTool.ShopObjectState(ShopObjectState.Disappeared),
    ColorTool.ShopObjectState(ShopObjectState.Existed),
  ];

  private subscription = new Subscription();
  ngOnInit(): void {
    this.regist();
    this.unit.change();
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
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load() {
    this.business.load(this.duration).then((datas) => {
      this.datas = datas;
    });
  }

  on = {
    click: (item: ChartItem) => {
      this.type.emit(item.id);
    },
  };
  unit = {
    value: DurationUnit.month,
    Type: DurationUnit,
    change: () => {
      let today = new Date();
      let language = '';
      switch (this.unit.value) {
        case DurationUnit.year:
          language = '今年';
          this.duration = DateTimeTool.all.year(today);
          break;
        case DurationUnit.month:
          language = '本月';
          this.duration = DateTimeTool.all.month(today);
          break;
        case DurationUnit.week:
          language = '本周';
          this.duration = DateTimeTool.all.week(today);
          break;
        case DurationUnit.day:
          language = '今日';
          this.duration = DateTimeTool.all.day(today);
          break;

        default:
          break;
      }
      // this.title = `${language}事件统计`;
      this.load();
      this.durationChange.emit(this.duration);
    },
  };
}
