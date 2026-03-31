import { Injectable } from '@angular/core';
import { GPSHighPrecision } from '../../../../../../common/data-core/enums/gps/gps-high-precision.enum';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { GetMobileDeviceRoutesParams } from '../../../../../../common/data-core/requests/services/system/mobile/system-mobile-device.params';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { ArrayTool } from '../../../../../../common/tools/array-tool/array.tool';
import { SystemModuleMobileDeviceRouteArgs } from '../system-module-mobile-device-route.model';

@Injectable()
export class SystemModuleMobileDeviceRouteMapBusiness {
  constructor(private service: ArmSystemRequestService) {}

  private interval = 5 * 60; // 5分钟

  device(deviceId: string) {
    return this.data.device(deviceId);
  }

  async load(args: SystemModuleMobileDeviceRouteArgs, rectified?: boolean) {
    let datas = await this.data.load(args, rectified);
    let paths = this.convert(datas);
    console.log(paths);
    return paths;
    // return datas;
  }

  private convert(datas: FileGpsItem[]) {
    if (!Array.isArray(datas) || datas.length === 0) {
      return [];
    }

    let group = ArrayTool.groupBy(datas, (x) => {
      return x.HighPrecision?.toString() || '1';
    });

    let result: FileGpsItem[][] = [];

    for (const key in group) {
      result.push(group[key]);
    }

    return result;
  }

  private data = {
    load: (args: SystemModuleMobileDeviceRouteArgs, rectified?: boolean) => {
      let params = new GetMobileDeviceRoutesParams();
      params.MobileDeviceId = args.deviceId;
      params.BeginTime = args.duration.begin;
      params.EndTime = args.duration.end;
      params.Rectified = rectified;
      return this.service.mobile.device.route
        .all(params)
        .catch((x) => {
          return [];
        })
        .then((datas) => {
          if (args.precision == undefined) {
            return datas;
          }
          if (args.precision == GPSHighPrecision.normal) {
            return datas.filter(
              (x) => !x.HighPrecision || x.HighPrecision == args.precision
            );
          }
          return datas.filter((x) => x.HighPrecision == args.precision);
        });
    },
    device: (deviceId: string) => {
      return this.service.mobile.device.cache.get(deviceId);
    },
  };
}
