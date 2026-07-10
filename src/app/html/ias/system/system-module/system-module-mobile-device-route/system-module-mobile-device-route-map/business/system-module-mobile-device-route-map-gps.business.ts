import { FileGpsItem } from '../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { GetMobileDeviceRoutesParams } from '../../../../../../../common/data-core/requests/services/system/mobile/system-mobile-device.params';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';
import { ObjectTool } from '../../../../../../../common/tools/object-tool/object.tool';
import { SystemModuleMobileDeviceRouteArgs } from '../../system-module-mobile-device-route.model';

export class SystemModuleMobileDeviceRouteMapGPSBusiness {
  constructor(private service: ArmSystemRequestService) {}

  private interval = 5 * 60; // 5分钟

  device(deviceId: string) {
    return this.data.device(deviceId);
  }

  datas: FileGpsItem[] = [];

  async load(
    args: SystemModuleMobileDeviceRouteArgs,
    rectified?: boolean,
    precision: boolean = true,
  ): Promise<FileGpsItem[][]> {
    this.datas = await this.data.gps(args, rectified);
    if (precision) {
      let paths = this.convert(this.datas);

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
    }
    this.datas.forEach((x) => {
      x.HighPrecision = 2;
    });
    return [this.datas];
  }

  private convert(datas: FileGpsItem[]) {
    if (!Array.isArray(datas) || datas.length === 0) {
      return [];
    }

    let result = ObjectTool.model.FileGpsItem.split(datas);
    return result;
  }

  private data = {
    gps: (args: SystemModuleMobileDeviceRouteArgs, rectified?: boolean) => {
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
