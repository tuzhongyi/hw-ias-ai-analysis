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
import { SystemMainCardEventChartLineRoadObjectBusiness } from './system-main-card-event-chart-line-roadobject.business';

@Component({
  selector: 'ias-system-main-card-event-chart-line-roadobject',
  imports: [
    CommonModule,
    FormsModule,
    SystemMainCardContainerComponent,
    SystemMainCardEventChartLineContainerComponent,
  ],
  templateUrl: './system-main-card-event-chart-line-roadobject.component.html',
  styleUrl: './system-main-card-event-chart-line-roadobject.component.less',
  providers: [SystemMainCardEventChartLineRoadObjectBusiness],
})
export class SystemMainCardEventChartLineRoadObjectComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;

  @Input() duration = DateTimeTool.all.day(new Date());
  @Output() durationChange = new EventEmitter<Duration>();

  constructor(
    private business: SystemMainCardEventChartLineRoadObjectBusiness
  ) {}

  private subscription = new Subscription();
  private load() {
    this.business.load(this.duration, this.unit.value).then((data) => {
      this.chart.datas = [data];
      this.chart.axis.x = ChartTool.axis.x.unit(this.unit.value);
      switch (this.unit.value) {
        case DurationUnit.day:
          this.chart.interval = 3;
          break;
        case DurationUnit.week:
        case DurationUnit.year:
          this.chart.interval = 0;
          break;
        case DurationUnit.month:
          this.chart.interval = 2;
          break;

        default:
          break;
      }
    });
  }
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

  title = '事件统计详情';

  unit = {
    value: DurationUnit.day,
    Type: DurationUnit,
    change: () => {
      let title = '事件统计详情';
      switch (this.unit.value) {
        case DurationUnit.day:
          this.title = `今日${title}`;
          break;
        case DurationUnit.week:
          this.title = `本周${title}`;
          break;
        case DurationUnit.month:
          this.title = `本月${title}`;
          break;
        case DurationUnit.year:
          this.title = `今年${title}`;
          break;

        default:
          break;
      }
      this.load();
    },
  };

  chart = {
    datas: [] as IChartData[],
    axis: {
      x: [] as string[],
    },
    interval: 0,
  };
}
