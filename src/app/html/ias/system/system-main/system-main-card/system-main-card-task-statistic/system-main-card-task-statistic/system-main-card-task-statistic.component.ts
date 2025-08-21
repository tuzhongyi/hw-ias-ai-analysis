import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartItem } from '../../../../../../../common/tools/chart-tool/chart.model';
import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';
import { SystemMainCardContainerComponent } from '../../system-main-card-container/system-main-card-container.component';
import { SystemMainCardTaskStatisticChartComponent } from '../system-main-card-task-statistic-chart/system-main-card-task-statistic-chart.component';
import { SystemMainCardTaskStatisticChartBusiness } from './system-main-card-task-statistic.business';

@Component({
  selector: 'ias-system-main-card-task-statistic',
  imports: [
    CommonModule,
    SystemMainCardContainerComponent,
    SystemMainCardTaskStatisticChartComponent,
  ],
  templateUrl: './system-main-card-task-statistic.component.html',
  styleUrl: './system-main-card-task-statistic.component.less',
  providers: [SystemMainCardTaskStatisticChartBusiness],
})
export class SystemMainCardTaskStatisticComponent {
  @Input('load') _load?: EventEmitter<void>;
  constructor(private business: SystemMainCardTaskStatisticChartBusiness) {}
  title = '任务统计';
  datas: ChartItem<string>[] = [];

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
