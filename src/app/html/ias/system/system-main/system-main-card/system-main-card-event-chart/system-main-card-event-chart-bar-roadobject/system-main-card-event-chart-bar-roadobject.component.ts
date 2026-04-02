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
import { SystemMainCardEventChartBarContainerComponent } from '../system-main-card-event-chart-bar-container/system-main-card-event-chart-bar-container.component';
import { SystemMainCardEventChartBarRoadObjectBusiness } from './system-main-card-event-chart-bar-roadobject.business';

@Component({
  selector: 'ias-system-main-card-event-chart-bar-roadobject',
  imports: [
    CommonModule,
    FormsModule,
    SystemMainCardContainerComponent,
    SystemMainCardEventChartBarContainerComponent,
  ],
  templateUrl: './system-main-card-event-chart-bar-roadobject.component.html',
  styleUrl: './system-main-card-event-chart-bar-roadobject.component.less',
  providers: [SystemMainCardEventChartBarRoadObjectBusiness],
})
export class SystemMainCardEventChartBarRoadObjectComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  @Input() date = new Date();
  @Output() dateChange = new EventEmitter<Date>();
  constructor(
    private business: SystemMainCardEventChartBarRoadObjectBusiness
  ) {}

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

  title = '部件扫描';

  datas: IChartData[] = [];
}
