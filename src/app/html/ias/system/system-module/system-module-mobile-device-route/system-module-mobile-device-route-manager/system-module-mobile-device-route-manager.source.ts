import { Injectable } from '@angular/core';
import { MobileDevice } from '../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { IIdNameModel } from '../../../../../../common/data-core/models/interface/model.interface';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { SystemModuleMobileDeviceRouteType } from '../system-module-mobile-device-route.model';

@Injectable()
export class SystemModuleMobileDeviceRouteManagerSource {
  devices: Promise<MobileDevice[]>;
  types: IIdNameModel<number>[] = [];
  constructor(private service: ArmSystemRequestService) {
    this.devices = this.init.device();
    this.init.type();
  }

  private init = {
    device: async () => {
      return this.service.mobile.device.all();
    },
    type: () => {
      this.types = [
        {
          Id: SystemModuleMobileDeviceRouteType.Meter,
          Name: '里程',
        },
        {
          Id: SystemModuleMobileDeviceRouteType.Speed,
          Name: '速度',
        },
        {
          Id: SystemModuleMobileDeviceRouteType.Time,
          Name: '时长',
        },
      ];
    },
  };

  get = {
    channels: (deviceId: string) => {
      return this.service.mobile.device.channels(deviceId);
    },
  };
}
