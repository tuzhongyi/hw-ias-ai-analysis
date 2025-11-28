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
import { IChartData } from '../../../../../../../common/tools/chart-tool/chart.model';
import { ChartTool } from '../../../../../../../common/tools/chart-tool/chart.tool';
import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';
import {
  Duration,
  DurationUnit,
} from '../../../../../../../common/tools/date-time-tool/duration.model';
import { SystemMainCardContainerComponent } from '../../system-main-card-container/system-main-card-container.component';
import { SystemMainCardEventChartLineContainerComponent } from '../system-main-card-event-chart-line-container/system-main-card-event-chart-line-container.component';
import { SystemMainCardEventChartLineShopBusiness } from './system-main-card-event-chart-line-shop.business';

@Component({
  selector: 'ias-system-main-card-event-chart-line-shop',
  imports: [
    CommonModule,
    FormsModule,
    SystemMainCardContainerComponent,
    SystemMainCardEventChartLineContainerComponent,
  ],
  templateUrl: './system-main-card-event-chart-line-shop.component.html',
  styleUrl: './system-main-card-event-chart-line-shop.component.less',
  providers: [SystemMainCardEventChartLineShopBusiness],
})
export class SystemMainCardEventChartLineShopComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  @Input() duration = DateTimeTool.all.month(new Date());
  @Output() durationChange = new EventEmitter<Duration>();
  constructor(private business: SystemMainCardEventChartLineShopBusiness) {}

  private date = new Date();
  private subscription = new Subscription();
  private load() {
    this.business.load(this.duration).then((data) => {
      this.chart.datas = data;
      this.chart.axis.x = ChartTool.axis.x.unit(this.unit.value);
      switch (this.unit.value) {
        case DurationUnit.week:
          this.chart.interval = 0;
          break;
        case DurationUnit.month:
          this.chart.interval = 2;
          break;

        default:
          break;
      }
      this.chart.interval;
    });
  }
  ngOnInit(): void {
    this.regist();
    this.load();
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

  get title() {
    let name = '商铺变更统计';
    switch (this.unit.value) {
      case DurationUnit.day:
        return `今日${name}`;
      case DurationUnit.week:
        return `本周${name}`;
      case DurationUnit.month:
        return `本月${name}`;
      case DurationUnit.year:
        return `今年${name}`;
      default:
        return name;
    }
  }

  chart = {
    datas: [] as IChartData[],
    axis: {
      x: [] as string[],
    },
    interval: 0,
  };

  unit = {
    value: DurationUnit.month,
    Type: DurationUnit,
    change: () => {
      this.duration = DateTimeTool.all.unit(this.date, this.unit.value);
      this.durationChange.emit(this.duration);
      this.load();
    },
  };
}
