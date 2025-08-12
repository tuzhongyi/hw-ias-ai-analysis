import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';
import { SystemMainCardContainerComponent } from '../../system-main-card-container/system-main-card-container.component';
import { SystemMainCardEventStatisticItemComponent } from '../system-main-card-event-statistic-item/system-main-card-event-statistic-item.component';
import { SystemMainCardEventStatisticItem } from '../system-main-card-event-statistic-item/system-main-card-event-statistic-item.model';
import { SystemMainCardEventStatisticBusiness } from './system-main-card-event-statistic.business';

@Component({
  selector: 'ias-system-main-card-event-statistic',
  imports: [
    CommonModule,
    SystemMainCardContainerComponent,
    SystemMainCardEventStatisticItemComponent,
  ],
  templateUrl: './system-main-card-event-statistic.component.html',
  styleUrl: './system-main-card-event-statistic.component.less',
  providers: [SystemMainCardEventStatisticBusiness],
})
export class SystemMainCardEventStatisticComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  constructor(private business: SystemMainCardEventStatisticBusiness) {}
  title = '事件统计';
  datas: SystemMainCardEventStatisticItem[] = [];

  private duration = DateTimeTool.last.year(new Date());
  private subscription = new Subscription();

  ngOnInit(): void {
    this.regist();
    this.load();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
  private async load() {
    let shop = await this.business.shop(this.duration);
    let realtime = await this.business.realtime(this.duration);
    let analysis = await this.business.analysis(this.duration);
    let task = await this.business.task(this.duration);
    this.datas = [shop, realtime, analysis, task];
  }
}
