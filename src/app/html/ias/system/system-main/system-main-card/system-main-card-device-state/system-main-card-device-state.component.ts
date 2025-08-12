import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SystemMainCardContainerComponent } from '../system-main-card-container/system-main-card-container.component';
import { SystemMainCardDeviceStateBusiness } from './system-main-card-device-state.business';

@Component({
  selector: 'ias-system-main-card-device-state',
  imports: [CommonModule, SystemMainCardContainerComponent],
  templateUrl: './system-main-card-device-state.component.html',
  styleUrl: './system-main-card-device-state.component.less',
  providers: [SystemMainCardDeviceStateBusiness],
})
export class SystemMainCardDeviceStateComponent implements OnInit, OnDestroy {
  @Input('load') _load?: EventEmitter<void>;
  constructor(private business: SystemMainCardDeviceStateBusiness) {}

  title = '车辆状态';
  value = {
    count: 3,
    online: 2,
    offline: 1,
  };
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
    this.business.load().then((datas) => {
      this.value.count = datas.length;
      this.value.online = 0;
      this.value.offline = 0;
      datas.forEach((x) => {
        if (x.OnlineStatus === 0) {
          this.value.online++;
        } else {
          this.value.offline++;
        }
      });
    });
  }
}
