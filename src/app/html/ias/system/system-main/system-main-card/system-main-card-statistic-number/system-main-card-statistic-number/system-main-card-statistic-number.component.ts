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
import { SystemMainCardContainerComponent } from '../../system-main-card-container/system-main-card-container.component';
import { SystemMainCardStatisticNumberItemComponent } from '../system-main-card-statistic-number-item/system-main-card-statistic-number-item.component';
import { SystemMainCardStatisticNumberItem } from '../system-main-card-statistic-number-item/system-main-card-statistic-number-item.model';
import { SystemMainCardStatisticNumberBusiness } from './system-main-card-statistic-number.business';

@Component({
  selector: 'ias-system-main-card-statistic-number',
  imports: [
    CommonModule,
    FormsModule,
    SystemMainCardContainerComponent,
    SystemMainCardStatisticNumberItemComponent,
  ],
  templateUrl: './system-main-card-statistic-number.component.html',
  styleUrl: './system-main-card-statistic-number.component.less',
  providers: [SystemMainCardStatisticNumberBusiness],
})
export class SystemMainCardStatisticNumberComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  @Output() itemclick = new EventEmitter<string>();

  constructor(private business: SystemMainCardStatisticNumberBusiness) {}
  title = '信息统计';
  datas: SystemMainCardStatisticNumberItem[] = [];

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
    let shop = await this.business.shop();
    let road = await this.business.road();
    let device = await this.business.device();
    let task = await this.business.task();
    this.datas = [shop, road, device, task];
  }

  on = {
    item: (item: SystemMainCardStatisticNumberItem) => {
      this.itemclick.emit(item.icon);
    },
  };
}
