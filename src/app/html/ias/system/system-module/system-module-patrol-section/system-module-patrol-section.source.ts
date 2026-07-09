import { Injectable } from '@angular/core';
import { MobileDevice } from '../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { ArmSystemRequestService } from '../../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class SystemModulePatrolSectionSource {
  devices: Promise<MobileDevice[]>;

  constructor(private service: ArmSystemRequestService) {
    this.devices = this.init.device();
  }

  private init = {
    device: async () => {
      return this.service.mobile.device.all();
    },
  };

  get = {
    channels: (deviceId: string) => {
      return this.service.mobile.device.channels(deviceId);
    },
  };
}
