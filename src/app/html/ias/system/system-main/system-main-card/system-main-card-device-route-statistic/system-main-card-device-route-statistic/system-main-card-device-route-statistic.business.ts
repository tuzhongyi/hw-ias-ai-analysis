import { Injectable } from '@angular/core';
import { DeviceRoutesStatistic } from '../../../../../../../common/data-core/models/arm/mobile-device/device-routes-statistic.model';
import { MobileDevice } from '../../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { GetMobileDeviceRoutesStatisticParams } from '../../../../../../../common/data-core/requests/services/system/mobile/system-mobile-device.params';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';
import { ChartItem } from '../../../../../../../common/tools/chart-tool/chart.model';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';

@Injectable()
export class SystemMainCardDeviceRouteStatisticChartBusiness {
  constructor(private service: ArmSystemRequestService) {}

  async load(duration: Duration) {
    let datas = await this.data.load(duration);

    let items: ChartItem<string>[] = [];
    for (const key in datas) {
      let data = datas[key];
      items.push(this.convert(data));
    }
    return items;
  }

  private convert(data: DeviceRoutesStatistic) {
    let item: ChartItem<string> = {
      id: data.Id,
      name: data.Name,
      value: data.TotalMeters || 0,
    };
    return item;
  }

  private data = {
    load: async (duration: Duration): Promise<DeviceRoutesStatistic[]> => {
      let devices = await this.data.device();

      let datas: DeviceRoutesStatistic[] = [];
      for (let i = 0; i < devices.length; i++) {
        let device = devices[i];
        let data = await this.data.statistic(device, duration);
        datas.push(data);
      }

      return datas;
    },
    statistic: (device: MobileDevice, duration: Duration) => {
      let params = new GetMobileDeviceRoutesStatisticParams();
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      params.MobileDeviceId = device.Id;
      params.MinSpeed = 5;
      return this.service.mobile.device.route.statistic(params).catch((x) => {
        let data = new DeviceRoutesStatistic();
        data.Id = device.Id;
        data.BeginTime = duration.begin;
        data.EndTime = duration.end;
        data.AvgSpeed = 0;
        data.FastestSpeed = 0;
        data.MovingSeconds = 0;
        data.Name = device.Name;
        data.StaySeconds = 0;
        data.TotalMeters = 0;
        return data;
      });
    },
    device: () => {
      return this.service.mobile.device.cache.all();
    },
  };
}
