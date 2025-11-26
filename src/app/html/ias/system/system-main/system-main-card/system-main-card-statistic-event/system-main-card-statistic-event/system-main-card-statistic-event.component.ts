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
import { ChartItem } from '../../../../../../../common/tools/chart-tool/chart.model';
import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';
import {
  Duration,
  DurationUnit,
} from '../../../../../../../common/tools/date-time-tool/duration.model';
import { EventMode } from '../../../system-main-map-navigation/system-main-map-navigation.model';
import { SystemMainCardContainerComponent } from '../../system-main-card-container/system-main-card-container.component';
import { SystemMainCardStatisticEventChartComponent } from '../system-main-card-statistic-event-chart/system-main-card-statistic-event-chart.component';
import { SystemMainCardStatisticEventBusiness } from './system-main-card-statistic-event.business';

@Component({
  selector: 'ias-system-main-card-statistic-event',
  imports: [
    CommonModule,
    FormsModule,
    SystemMainCardContainerComponent,
    SystemMainCardStatisticEventChartComponent,
  ],
  templateUrl: './system-main-card-statistic-event.component.html',
  styleUrl: './system-main-card-statistic-event.component.less',
  providers: [SystemMainCardStatisticEventBusiness],
})
export class SystemMainCardStatisticEventComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  @Input() duration = DateTimeTool.all.month(new Date());
  @Output() durationChange = new EventEmitter<Duration>();
  @Output() type = new EventEmitter<EventMode>();
  constructor(private business: SystemMainCardStatisticEventBusiness) {}
  title = '本月事件统计';

  datas: ChartItem[] = [];
  color = [
    '#e91e63',
    '#1e90ff',
    '#01edf5',
    '#28ce38',
    '#9d4edd',
    '#ff3b30',
    '#ff762c',
    '#ffd700',
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
    value: DurationUnit.year,
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
      this.title = `${language}事件统计`;
      this.load();
      this.durationChange.emit(this.duration);
    },
  };
}
