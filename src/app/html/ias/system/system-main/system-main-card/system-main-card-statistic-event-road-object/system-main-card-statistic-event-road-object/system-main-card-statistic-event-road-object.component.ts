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
import { SystemMainCardStatisticEventRoadObjectChartComponent } from '../system-main-card-statistic-event-road-object-chart/system-main-card-statistic-event-road-object-chart.component';
import { SystemMainCardStatisticEventRoadObjectBusiness } from './system-main-card-statistic-event-road-object.business';

@Component({
  selector: 'ias-system-main-card-statistic-event-road-object',
  imports: [
    CommonModule,
    FormsModule,
    SystemMainCardContainerComponent,
    SystemMainCardStatisticEventRoadObjectChartComponent,
  ],
  templateUrl: './system-main-card-statistic-event-road-object.component.html',
  styleUrl: './system-main-card-statistic-event-road-object.component.less',
  providers: [SystemMainCardStatisticEventRoadObjectBusiness],
})
export class SystemMainCardStatisticEventRoadObjectComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  @Input() duration = DateTimeTool.last.month(new Date());
  @Output() durationChange = new EventEmitter<Duration>();
  @Output() type = new EventEmitter<number>();
  constructor(
    private business: SystemMainCardStatisticEventRoadObjectBusiness
  ) {}
  title = '事件分类统计';

  datas: ChartItem[] = [];
  color = [ColorTool.blue, ColorTool.redlight, ColorTool.red];

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
        case DurationUnit.month:
          language = '近一月';
          this.duration = DateTimeTool.last.month(today);
          break;
        case DurationUnit.week:
          language = '近一周';
          this.duration = DateTimeTool.last.week(today);
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
