import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DeviceRoutesStatistic } from '../../../../../../common/data-core/models/arm/mobile-device/device-routes-statistic.model';
import { SystemModuleMobileDeviceRouteChartComponent } from '../system-module-mobile-device-route-chart/system-module-mobile-device-route-chart.component';
import {
  SystemModuleMobileDeviceRouteArgs,
  SystemModuleMobileDeviceRouteType,
} from '../system-module-mobile-device-route.model';
import { SystemModuleMobileDeviceRouteChartContainerBusiness } from './system-module-mobile-device-route-chart-container.business';

@Component({
  selector: 'howell-system-module-mobile-device-route-chart-container',
  imports: [CommonModule, SystemModuleMobileDeviceRouteChartComponent],
  templateUrl:
    './system-module-mobile-device-route-chart-container.component.html',
  styleUrl:
    './system-module-mobile-device-route-chart-container.component.less',
  providers: [SystemModuleMobileDeviceRouteChartContainerBusiness],
})
export class SystemModuleMobileDeviceRouteChartContainerComponent
  implements OnInit, OnDestroy
{
  @Input()
  load?: EventEmitter<SystemModuleMobileDeviceRouteArgs>;

  constructor(
    private business: SystemModuleMobileDeviceRouteChartContainerBusiness
  ) {}

  args = new SystemModuleMobileDeviceRouteArgs();
  datas: DeviceRoutesStatistic[] = [];
  loading = false;
  loaded = false;
  RouteStatisticType = SystemModuleMobileDeviceRouteType;

  private subscription = new Subscription();
  private regist() {
    if (this.load) {
      let sub = this.load.subscribe((x) => {
        this.loaded = true;
        this.args = x;
        this.data.load(x);
      });
      this.subscription.add(sub);
    }
  }

  private data = {
    load: (args: SystemModuleMobileDeviceRouteArgs) => {
      this.loading = true;
      this.business
        .load(args.deviceId, args.unit, args.duration.begin)
        .then((x) => {
          this.datas = x;
        })
        .finally(() => {
          this.loading = false;
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
