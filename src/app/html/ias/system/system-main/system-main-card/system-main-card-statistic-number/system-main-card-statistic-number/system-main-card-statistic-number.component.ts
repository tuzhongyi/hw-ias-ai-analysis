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
import { GlobalStorage } from '../../../../../../../common/storage/global.storage';
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

  constructor(
    private business: SystemMainCardStatisticNumberBusiness,
    private global: GlobalStorage
  ) {}
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
    /**
     * 先攒到本地数组，取完再一次性赋值。
     * 以前是 this.datas = [] 之后逐个 push，每分钟刷新时卡片会先空一下、
     * 再一条条长回来，看着就是闪一下
     */
    let datas: SystemMainCardStatisticNumberItem[] = [];

    let device = await this.business.device();

    if (this.global.display.map.shop) {
      let shop = await this.business.shop();
      datas.push(shop);
    } else {
      let road = await this.business.road();
      datas.push(road);
    }

    datas.push(device);
    if (this.global.display.map.gpstask) {
      let task = await this.business.task();
      datas.push(task);
    }
    if (this.global.display.map.roadobject) {
      let roadobject = await this.business.roadobject();
      datas.push(roadobject);
    }

    this.datas = datas;
  }

  on = {
    item: (item: SystemMainCardStatisticNumberItem) => {
      this.itemclick.emit(item.icon);
    },
  };
}
