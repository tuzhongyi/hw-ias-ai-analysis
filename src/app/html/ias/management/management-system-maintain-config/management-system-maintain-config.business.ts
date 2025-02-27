import { Injectable } from '@angular/core';
import { FactoryResetMode } from '../../../../common/data-core/enums/factory-reset-mode.enum';
import { ArmSystemRequestService } from '../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class ManagementSystemMaintainConfigBusiness {
  constructor(private service: ArmSystemRequestService) {}

  reboot() {
    return this.service.reboot();
  }
  shutdown() {
    return this.service.shutdown();
  }

  config = {
    upload: (data: ArrayBuffer) => {
      return this.service.data.configuration.upload(data);
    },
  };

  factory = {
    reset: (mode: FactoryResetMode) => {
      return this.service.factory.reset(mode);
    },
  };

  upgrade(data: ArrayBuffer) {
    return this.service.firmware.update(data);
  }
}
