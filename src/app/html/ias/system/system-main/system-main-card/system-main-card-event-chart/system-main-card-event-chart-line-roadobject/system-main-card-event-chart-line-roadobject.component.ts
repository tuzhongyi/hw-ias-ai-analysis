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
import { SystemMainCardContainerComponent } from '../../system-main-card-container/system-main-card-container.component';
import { SystemMainCardEventChartLineContainerComponent } from '../system-main-card-event-chart-line-container/system-main-card-event-chart-line-container.component';
import { SystemMainCardEventChartLineSampleBusiness } from './system-main-card-event-chart-line-roadobject.business';

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
  providers: [SystemMainCardEventChartLineSampleBusiness],
})
export class SystemMainCardEventChartLineRealtimeComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  @Input() date = new Date(2025, 10, 5);
  @Output() dateChange = new EventEmitter<Date>();
  constructor(private business: SystemMainCardEventChartLineSampleBusiness) {}

  private subscription = new Subscription();
  private load() {
    this.business.load(this.date).then((data) => {
      this.datas = [data];
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

  title = '今日事件统计';

  datas: IChartData[] = [];
}
