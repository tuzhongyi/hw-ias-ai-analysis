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

    let result = this.split(datas);
    console.log(result);
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

  private split(arr: FileGpsItem[]) {
    if (!arr || arr.length === 0) return [];

    // ======================
    // 第一步：原有正确分组（完全不动）
    // ======================
    const result = [];
    let current = [];
    let temp1 = [];

    for (const item of arr) {
      if (item.HighPrecision) {
        temp1.push(item);
        continue;
      }

      if (temp1.length > 0) {
        if (temp1.length >= 2) {
          if (current.length) {
            result.push([...current]);
            current = [];
          }
          result.push([...temp1]);
        } else {
          current.push(...temp1);
        }
        temp1 = [];
      }
      current.push(item);
    }

    if (temp1.length > 0) {
      if (temp1.length >= 2) {
        if (current.length) {
          result.push([...current]);
          current = [];
        }
        result.push([...temp1]);
      } else {
        current.push(...temp1);
      }
    }
    if (current.length) result.push(current);

    // ======================
    // 第二步：给每组标记 type（0=包含0，1=全1）
    // ======================
    const groups = result.map((g) => ({
      type: g.every((i) => !!i.HighPrecision) ? 1 : 0,
      data: g,
    }));

    // ======================
    // 第三步：复制 1 组首尾到 0 组（只复制！不破坏原结构）
    // ======================
    for (let i = 0; i < groups.length; i++) {
      const g = groups[i];
      if (g.type !== 1) continue; // 只处理全1的组

      const first = g.data[0]; // 1组第一个
      const last = g.data.at(-1); // 1组最后一个

      // 复制 1组首元素 → 上一个 0组 的结尾
      if (i > 0 && groups[i - 1].type === 0) {
        groups[i - 1].data.push({ ...first });
      }

      // 复制 1组尾元素 → 下一个 0组 的开头
      if (i < groups.length - 1 && groups[i + 1].type === 0 && last) {
        groups[i + 1].data.unshift({ ...last });
      }
    }

    return groups.map((item) => item.data);
  }
}
