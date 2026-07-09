import { Injectable } from '@angular/core';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { GetMobileDeviceRoutesParams } from '../../../../../../common/data-core/requests/services/system/mobile/system-mobile-device.params';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { Duration } from '../../../../../../common/tools/date-time-tool/duration.model';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';

@Injectable()
export class SystemModulePatrolSectionMapBusiness {
  constructor(private service: ArmSystemRequestService) {}

  device(deviceId: string) {
    return this.data.device(deviceId);
  }

  datas: FileGpsItem[] = [];

  async load(
    deviceId: string,
    duration: Duration,
    precision?: boolean,
    rectified?: boolean,
  ) {
    this.datas = await this.data.load(deviceId, duration, rectified);
    let paths = this.convert(this.datas);

    if (precision == true) {
      paths = paths.filter((group) => {
        return !!group.every((item) => item.HighPrecision);
      });
    } else if (precision == false) {
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
    load: (deviceId: string, duration: Duration, rectified?: boolean) => {
      let params = new GetMobileDeviceRoutesParams();
      params.MobileDeviceId = deviceId;
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
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
