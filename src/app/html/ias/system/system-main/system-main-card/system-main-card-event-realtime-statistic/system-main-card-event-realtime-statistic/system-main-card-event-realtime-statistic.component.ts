import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartItem } from '../../../../../../../common/tools/chart-tool/chart.model';
import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';
import { SystemMainCardContainerComponent } from '../../system-main-card-container/system-main-card-container.component';
import { SystemMainCardEventRealtimeStatisticChartComponent } from '../system-main-card-event-realtime-statistic-chart/system-main-card-event-realtime-statistic-chart.component';
import { SystemMainCardEventRealtimeStatisticBusiness } from './system-main-card-event-realtime-statistic.business';

@Component({
  selector: 'ias-system-main-card-event-realtime-statistic',
  imports: [
    CommonModule,
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
  constructor(private business: SystemMainCardEventRealtimeStatisticBusiness) {}
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
  duration = DateTimeTool.last.year(new Date());
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
      this.datas = datas;
    });
  }
}
