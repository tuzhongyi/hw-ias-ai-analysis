import { Injectable } from '@angular/core';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { GetMobileDeviceRoutesParams } from '../../../../../../common/data-core/requests/services/system/mobile/system-mobile-device.params';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
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
    let paths = this.convert(datas, this.interval);

    console.log(paths);
    return paths;
    // return datas;
  }

  private convert(datas: FileGpsItem[], interval: number) {
    if (!Array.isArray(datas) || datas.length === 0) {
      return [];
    }

    const result = [];
    let currentGroup = [datas[0]];

    for (let i = 1; i < datas.length; i++) {
      const currentItem = datas[i];
      const prevItem = datas[i - 1];

      // 获取当前和前一个时间戳
      const currentTime = currentItem.OffsetTime.toSeconds();
      const prevTime = prevItem.OffsetTime.toSeconds();

      // 计算时间差
      const timeDiff = currentTime - prevTime;

      if (timeDiff <= interval) {
        // 时间间隔在范围内，加入当前组
        currentGroup.push(currentItem);
      } else {
        // 时间间隔超出范围，开始新组
        result.push(currentGroup);
        currentGroup = [currentItem];
      }
    }

    // 添加最后一组
    if (currentGroup.length > 0) {
      result.push(currentGroup);
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
      return this.service.mobile.device.route.all(params).catch((x) => {
        return [];
      });
    },
    device: (deviceId: string) => {
      return this.service.mobile.device.cache.get(deviceId);
    },
  };
}
