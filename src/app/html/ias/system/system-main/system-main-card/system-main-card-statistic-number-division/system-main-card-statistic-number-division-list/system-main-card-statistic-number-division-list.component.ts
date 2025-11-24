import { CommonModule, KeyValue } from '@angular/common';
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
import { Division } from '../../../../../../../common/data-core/models/arm/division/division.model';
import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';
import {
  Duration,
  DurationUnit,
} from '../../../../../../../common/tools/date-time-tool/duration.model';
import { SystemMainCardContainerComponent } from '../../system-main-card-container/system-main-card-container.component';
import { SystemMainCardStatisticNumberDivisionItemComponent } from '../system-main-card-statistic-number-division-item/system-main-card-statistic-number-division-item.component';
import { SystemMainCardStatisticNumberDivisionBusiness } from './system-main-card-statistic-number-division-list.business';

@Component({
  selector: 'ias-system-main-card-statistic-number-division-list',
  imports: [
    CommonModule,
    FormsModule,
    SystemMainCardContainerComponent,
    SystemMainCardStatisticNumberDivisionItemComponent,
  ],
  templateUrl:
    './system-main-card-statistic-number-division-list.component.html',
  styleUrl: './system-main-card-statistic-number-division-list.component.less',
  providers: [SystemMainCardStatisticNumberDivisionBusiness],
})
export class SystemMainCardStatisticNumberDivisionListComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  @Input() duration = DateTimeTool.all.month(new Date());
  @Output() durationChange = new EventEmitter<Duration>();

  constructor(
    private business: SystemMainCardStatisticNumberDivisionBusiness
  ) {}
  title = '区划事件统计';

  datas = new Map<
    Division,
    KeyValue<string, { number: number; title: string }>[]
  >();

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
    this.business.load(this.duration).then((x) => {
      this.datas = x;
    });
  }

  unit = {
    value: DurationUnit.year,
    Type: DurationUnit,
    change: () => {
      this.duration = DateTimeTool.all.unit(new Date(), this.unit.value);
      this.load();
      this.durationChange.emit(this.duration);
    },
  };
}
