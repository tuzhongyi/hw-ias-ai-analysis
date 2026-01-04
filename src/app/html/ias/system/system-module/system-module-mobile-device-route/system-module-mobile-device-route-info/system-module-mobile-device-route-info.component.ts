import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SystemModuleMobileDeviceRouteArgs } from '../system-module-mobile-device-route.model';
import { SystemModuleMobileDeviceRouteInfoBusiness } from './system-module-mobile-device-route-info.business';
import { ISystemModuleMobileDeviceRouteInfo } from './system-module-mobile-device-route-info.model';

@Component({
  selector: 'howell-system-module-mobile-device-route-info',
  imports: [CommonModule],
  templateUrl: './system-module-mobile-device-route-info.component.html',
  styleUrl: './system-module-mobile-device-route-info.component.less',
  providers: [SystemModuleMobileDeviceRouteInfoBusiness],
})
export class SystemModuleMobileDeviceRouteInfoComponent
  implements OnInit, OnDestroy
{
  @Input()
  load?: EventEmitter<SystemModuleMobileDeviceRouteArgs>;

  constructor(private business: SystemModuleMobileDeviceRouteInfoBusiness) {}
  data?: ISystemModuleMobileDeviceRouteInfo;

  private subscription = new Subscription();
  private regist() {
    if (this.load) {
      let sub = this.load.subscribe((x) => {
        this._data.load(x);
      });
      this.subscription.add(sub);
    }
  }

  private _data = {
    load: (args: SystemModuleMobileDeviceRouteArgs) => {
      this.business.load(args).then((x) => {
        this.data = x;
      });
    },
  };

  ngOnInit(): void {
    this.regist();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
