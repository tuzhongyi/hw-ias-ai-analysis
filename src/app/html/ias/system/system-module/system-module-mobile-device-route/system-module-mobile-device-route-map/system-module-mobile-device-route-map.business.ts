import { Injectable } from '@angular/core';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { GetMobileDeviceRoutesParams } from '../../../../../../common/data-core/requests/services/system/mobile/system-mobile-device.params';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';
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

    if (args.precision == true) {
      paths = paths.filter((group) => {
        return !!group.every((item) => item.HighPrecision);
      });
    } else if (args.precision == false) {
      paths = paths.filter((group) => {
        return !group.every((item) => item.HighPrecision);
      });
    } else {
    }

    return paths;
    // return datas;
  }

  private convert(datas: FileGpsItem[]) {
    if (!Array.isArray(datas) || datas.length === 0) {
      return [];
    }

    let result = ObjectTool.model.FileGpsItem.split(datas);
    return result;
  }

  private data = {
    load: (args: SystemModuleMobileDeviceRouteArgs, rectified?: boolean) => {
      let params = new GetMobileDeviceRoutesParams();
      params.MobileDeviceId = args.deviceId;
      params.BeginTime = args.duration.begin;
      params.EndTime = args.duration.end;
      params.Rectified = rectified;
      return this.service.mobile.device.route.all(params).catch((x) => {
        return [];
      });
    },
    device: (deviceId: string) => {
      return this.service.mobile.device.cache.get(deviceId);
    },
  };
}
