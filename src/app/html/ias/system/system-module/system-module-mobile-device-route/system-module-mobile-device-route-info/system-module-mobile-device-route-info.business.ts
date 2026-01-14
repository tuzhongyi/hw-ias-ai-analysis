import { Injectable } from '@angular/core';

import { SystemModuleMobileDeviceRouteArgs } from '../system-module-mobile-device-route.model';

import { DeviceRoutesStatistic } from '../../../../../../common/data-core/models/arm/mobile-device/device-routes-statistic.model';
import { GetMobileDeviceRoutesStatisticParams } from '../../../../../../common/data-core/requests/services/system/mobile/system-mobile-device.params';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { ISystemModuleMobileDeviceRouteInfo } from './system-module-mobile-device-route-info.model';

@Injectable()
export class SystemModuleMobileDeviceRouteInfoBusiness {
  constructor(private service: ArmSystemRequestService) {}

  async load(args: SystemModuleMobileDeviceRouteArgs) {
    let data = await this.data.load(args);
    let model = this.convert(data);
    return model;
  }

  private convert(data: DeviceRoutesStatistic) {
    let info: ISystemModuleMobileDeviceRouteInfo = {
      TotalMeters: `${(data.TotalMeters / 1000).toFixed(2)}`,
      AvgSpeed: `${data.AvgSpeed.toFixed(2)}`,
      FastestSpeed: `${data.FastestSpeed.toFixed(2)}`,
      MovingTime: `${Language.Time(data.MovingSeconds)}`,
      StayTime: `${Language.Time(data.StaySeconds)}`,
      CoveragePercent: `${(data.CoveragePercent ?? 0).toFixed(2)}`,
    };
    return info;
  }

  private data = {
    load: async (args: SystemModuleMobileDeviceRouteArgs) => {
      let params = new GetMobileDeviceRoutesStatisticParams();
      params.MobileDeviceId = args.deviceId;
      params.BeginTime = args.duration.begin;
      params.EndTime = args.duration.end;
      params.MinSpeed = 3;

      return this.service.mobile.device.route.statistic(params).catch((e) => {
        let statistic = new DeviceRoutesStatistic();
        statistic.BeginTime = args.duration.begin;
        statistic.EndTime = args.duration.end;
        statistic.AvgSpeed = 0;
        statistic.FastestSpeed = 0;
        statistic.MovingSeconds = 0;
        statistic.StaySeconds = 0;
        statistic.TotalMeters = 0;
        statistic.CoveragePercent = 0;
        statistic.DailyMeters = 0;
        return statistic;
      });
    },
  };
}
