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
import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';
import {
  Duration,
  DurationUnit,
} from '../../../../../../../common/tools/date-time-tool/duration.model';
import { SystemMainCardContainerComponent } from '../../system-main-card-container/system-main-card-container.component';
import { SystemMainCardEventStatisticItemComponent } from '../system-main-card-event-statistic-item/system-main-card-event-statistic-item.component';
import { SystemMainCardEventStatisticItem } from '../system-main-card-event-statistic-item/system-main-card-event-statistic-item.model';
import { SystemMainCardEventStatisticBusiness } from './system-main-card-event-statistic.business';

@Component({
  selector: 'ias-system-main-card-event-statistic',
  imports: [
    CommonModule,
    FormsModule,
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
  @Input() duration = DateTimeTool.all.month(new Date());
  @Output() durationChange = new EventEmitter<Duration>();
  @Output() itemclick = new EventEmitter<string>();

  constructor(private business: SystemMainCardEventStatisticBusiness) {}
  title = '事件统计';
  datas: SystemMainCardEventStatisticItem[] = [];

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

  unit = {
    value: DurationUnit.year,
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

  on = {
    item: (item: SystemMainCardEventStatisticItem) => {
      this.itemclick.emit(item.icon);
    },
  };
}
