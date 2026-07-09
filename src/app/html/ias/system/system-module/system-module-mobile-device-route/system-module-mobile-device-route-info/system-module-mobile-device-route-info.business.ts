import { Injectable } from '@angular/core';

import { SystemModuleMobileDeviceRouteArgs } from '../system-module-mobile-device-route.model';

import { DeviceRoutesStatistic } from '../../../../../../common/data-core/models/arm/mobile-device/device-routes-statistic.model';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import {
  GetPatrolPlansParams,
  MatchPatrolPlansParams,
} from '../../../../../../common/data-core/requests/services/geographic/patrol/patrol-plan/geographic-patrol-plan.params';
import { GetMobileDeviceRoutesStatisticParams } from '../../../../../../common/data-core/requests/services/system/mobile/system-mobile-device.params';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { ISystemModuleMobileDeviceRouteInfo } from './system-module-mobile-device-route-info.model';

@Injectable()
export class SystemModuleMobileDeviceRouteInfoBusiness {
  constructor(
    system: ArmSystemRequestService,
    geo: ArmGeographicRequestService,
  ) {
    this.service = { system, geo };
  }

  private service: {
    system: ArmSystemRequestService;
    geo: ArmGeographicRequestService;
  };

  async load(args: SystemModuleMobileDeviceRouteArgs) {
    let data = await this.data.load(args);
    let device = await this.data.device(args.deviceId);
    let plans = await this.data.plan(
      device.Id,
      device.GridCellId ?? device.DivisionId,
    );
    let matchs = await Promise.all(
      plans.map((x) => this.data.match(x.Id, args)),
    );
    let count = 0;
    let number = 0;
    matchs.forEach((x) => {
      if (x.CoveragePercent != undefined) {
        count += x.CoveragePercent;
        number++;
      }
    });
    let model = this.convert(data, count / number);
    return model;
  }

  private convert(data: DeviceRoutesStatistic, CoveragePercent: number) {
    let info: ISystemModuleMobileDeviceRouteInfo = {
      TotalMeters: `${(data.TotalMeters / 1000).toFixed(2)}`,
      AvgSpeed: `${data.AvgSpeed.toFixed(2)}`,
      FastestSpeed: `${data.FastestSpeed.toFixed(2)}`,
      MovingTime: `${Language.Time(data.MovingSeconds)}`,
      StayTime: `${Language.Time(data.StaySeconds)}`,
      CoveragePercent: `${CoveragePercent.toFixed(2)}`,
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

      return this.service.system.mobile.device.route
        .statistic(params)
        .catch((e) => {
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
    device: (deviceId: string) => {
      return this.service.system.mobile.device.cache.get(deviceId);
    },
    plan: (deviceId: string, divisionId?: string) => {
      let params = new GetPatrolPlansParams();
      params.MobileDeviceId = deviceId;
      if (divisionId) {
        params.DivisionIds = [divisionId];
      }

      return this.service.geo.patrol.plan.all(params);
    },
    match: (planId: string, args: SystemModuleMobileDeviceRouteArgs) => {
      let params = new MatchPatrolPlansParams();
      params.BeginTime = args.duration.begin;
      params.EndTime = args.duration.end;
      params.MobileDeviceId = args.deviceId;
      params.PatrolPlanId = planId;
      return this.service.geo.patrol.plan.match(params);
    },
  };
}
