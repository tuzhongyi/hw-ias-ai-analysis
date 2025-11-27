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
import { SystemMainCardStatisticNumberItemComponent } from '../system-main-card-statistic-number-item/system-main-card-statistic-number-item.component';
import { SystemMainCardStatisticNumberItem } from '../system-main-card-statistic-number-item/system-main-card-statistic-number-item.model';
import { SystemMainCardStatisticNumberDeviceBusiness } from './system-main-card-statistic-number-device.business';

@Component({
  selector: 'ias-system-main-card-statistic-number-device',
  imports: [
    CommonModule,
    FormsModule,
    SystemMainCardContainerComponent,
    SystemMainCardStatisticNumberItemComponent,
  ],
  templateUrl: './system-main-card-statistic-number-device.component.html',
  styleUrl: './system-main-card-statistic-number-device.component.less',
  providers: [SystemMainCardStatisticNumberDeviceBusiness],
})
export class SystemMainCardStatisticNumberDeviceComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  @Input() duration = DateTimeTool.all.month(new Date());
  @Output() durationChange = new EventEmitter<Duration>();
  @Output() itemclick = new EventEmitter<string>();

  constructor(private business: SystemMainCardStatisticNumberDeviceBusiness) {}
  title = '本月行驶距离';
  datas: SystemMainCardStatisticNumberItem[] = [];

  private subscription = new Subscription();

  ngOnInit(): void {
    this.regist();
    this.load(this.duration);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private regist() {
    if (this._load) {
      this.subscription.add(
        this._load.subscribe(() => {
          this.load(this.duration);
        })
      );
    }
  }
  private async load(duration: Duration) {
    this.datas = await this.business.load(duration);
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
      this.load(this.duration);
      this.durationChange.emit(this.duration);
    },
  };
  on = {
    item: (item: SystemMainCardStatisticNumberItem) => {
      this.itemclick.emit(item.icon);
    },
  };
}
