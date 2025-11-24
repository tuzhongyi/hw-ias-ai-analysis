import { Injectable } from '@angular/core';
import { GetMobileDeviceRoutesStatisticParams } from '../../../../../../../common/data-core/requests/services/system/mobile/system-mobile-device.params';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';
import { SystemMainCardStatisticNumberItem } from '../system-main-card-statistic-number-item/system-main-card-statistic-number-item.model';

@Injectable()
export class SystemMainCardStatisticNumberDeviceBusiness {
  constructor(private service: ArmSystemRequestService) {}

  async load(duration: Duration) {
    let devices = await this.data.device();
    let items: SystemMainCardStatisticNumberItem<number>[] = [];
    for (let i = 0; i < devices.length; i++) {
      const device = devices[i];
      let meter = await this.data.statistic(device.Id, duration);
      let item: SystemMainCardStatisticNumberItem<number> = {
        icon: 'device',
        name: device.Name,
        value: this.meter(meter),
        unit: meter > 1000 ? '公里' : '米',
      };
      items.push(item);
    }
    return items;
  }

  meter(value = 0) {
    if (value == 0) {
      return 0;
    } else if (value > 1000) {
      return Math.round((value / 1000) * 100) / 100;
    } else {
      return value;
    }
  }

  data = {
    device: () => {
      return this.service.mobile.device.all();
    },
    statistic: async (id: string, duration: Duration) => {
      let params = new GetMobileDeviceRoutesStatisticParams();
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      params.MobileDeviceId = id;
      params.MinSpeed = 5;
      return this.service.mobile.device.route
        .statistic(params)
        .then((x) => {
          return x.TotalMeters;
        })
        .catch(() => {
          return 0;
        });
    },
  };
}
