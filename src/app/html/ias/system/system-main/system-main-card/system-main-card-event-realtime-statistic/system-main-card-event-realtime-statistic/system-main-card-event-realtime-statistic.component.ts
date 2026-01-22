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
import { ColorTool } from '../../../../../../../common/tools/color/color.tool';
import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';
import {
  Duration,
  DurationUnit,
} from '../../../../../../../common/tools/date-time-tool/duration.model';
import { SystemMainCardContainerComponent } from '../../system-main-card-container/system-main-card-container.component';
import { SystemMainCardEventRealtimeStatisticChartComponent } from '../system-main-card-event-realtime-statistic-chart/system-main-card-event-realtime-statistic-chart.component';
import { SystemMainCardEventRealtimeStatisticBusiness } from './system-main-card-event-realtime-statistic.business';

@Component({
  selector: 'ias-system-main-card-event-realtime-statistic',
  imports: [
    CommonModule,
    FormsModule,
    SystemMainCardContainerComponent,
    SystemMainCardEventRealtimeStatisticChartComponent,
  ],
  templateUrl: './system-main-card-event-realtime-statistic.component.html',
  styleUrl: './system-main-card-event-realtime-statistic.component.less',
  providers: [SystemMainCardEventRealtimeStatisticBusiness],
})
export class SystemMainCardEventRealtimeStatisticComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  @Input() duration = DateTimeTool.all.month(new Date());
  @Output() durationChange = new EventEmitter<Duration>();
  @Output() type = new EventEmitter<number>();
  constructor(private business: SystemMainCardEventRealtimeStatisticBusiness) {}
  title = '本月实时事件统计';

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
    '#23e353',
  ];
  style = {
    statistic: {
      gap: '20px',
    },
    info: {
      flexWrap: '',
      justifyContent: 'space-around',
      transform: '',
      width: '',
      height: '',
      item: {
        height: '',
      },
    },
    chart: {
      width: '',
    },

    load: (count: number) => {
      if (count > 12) {
        this.style.statistic.gap = '0px';
        this.style.info.flexWrap = 'wrap';
        this.style.info.justifyContent = 'flex-start';
        this.style.info.transform = `scale(0.8)  translate(-10%, -10%)`;
        this.style.info.width = `calc((100% - ${this.style.statistic.gap}) * 0.6)`;
        this.style.info.height = 'calc(120%)';
        this.style.info.item.height = 'calc(100% / 8)';
        this.style.chart.width = `calc((100% - ${this.style.statistic.gap}) * 0.4)`;
      } else if (count > 8) {
        this.style.statistic.gap = '20px';
        this.style.info.flexWrap = '';
        this.style.info.justifyContent = 'center';
        this.style.info.transform = `scale(${8 / count})`;
        this.style.info.width = `calc((100% - ${this.style.statistic.gap}) * 0.5)`;
        this.style.info.height = '';
        this.style.info.item.height = '';
        this.style.chart.width = `calc((100% - ${this.style.statistic.gap}) * 0.5)`;
      } else {
        this.style.statistic.gap = '20px';
        this.style.info.flexWrap = '';
        this.style.info.justifyContent = 'space-around';
        this.style.info.transform = '';
        this.style.info.width = `calc((100% - ${this.style.statistic.gap}) * 0.5)`;
        this.style.info.height = '';
        this.style.info.item.height = '';
        this.style.chart.width = `calc((100% - ${this.style.statistic.gap}) * 0.5)`;
      }
    },
  };

  private subscription = new Subscription();
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

  private load() {
    this.business.load(this.duration).then((datas) => {
      this.color = datas.map((x) => `${ColorTool.get.index(x.id, 10)}`);
      this.datas = datas;
      this.style.load(datas.length);
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
