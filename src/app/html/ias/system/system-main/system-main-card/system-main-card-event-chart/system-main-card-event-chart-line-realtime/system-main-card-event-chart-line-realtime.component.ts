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
import { SystemMainCardEventChartLineRealtimeBusiness } from './system-main-card-event-chart-line-realtime.business';

@Component({
  selector: 'ias-system-main-card-event-chart-line-realtime',
  imports: [
    CommonModule,
    FormsModule,
    SystemMainCardContainerComponent,
    SystemMainCardEventChartLineContainerComponent,
  ],
  templateUrl: './system-main-card-event-chart-line-realtime.component.html',
  styleUrl: './system-main-card-event-chart-line-realtime.component.less',
  providers: [SystemMainCardEventChartLineRealtimeBusiness],
})
export class SystemMainCardEventChartLineRealtimeComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  @Input() duration = DateTimeTool.last.month(new Date());
  @Output() durationChange = new EventEmitter<Duration>();
  constructor(private business: SystemMainCardEventChartLineRealtimeBusiness) {}

  private date = new Date();
  private subscription = new Subscription();
  private load() {
    this.business.load(this.duration).then((data) => {
      this.chart.datas = data ? [data] : [];
      this.chart.axis.x = ChartTool.axis.x.last.unit(
        this.unit.value,
        this.duration
      );

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
    switch (this.unit.value) {
      case DurationUnit.day:
        return '今日实时事件统计';
      case DurationUnit.week:
        return '近一周实时事件统计';
      case DurationUnit.month:
        return '近一月实时事件统计';
      default:
        return '实时事件统计';
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
      switch (this.unit.value) {
        case DurationUnit.week:
          this.duration = DateTimeTool.last.week(this.date);
          break;
        case DurationUnit.month:
          this.duration = DateTimeTool.last.month(this.date);
          break;

        default:
          break;
      }
      this.durationChange.emit(this.duration);
      this.load();
    },
  };
}
