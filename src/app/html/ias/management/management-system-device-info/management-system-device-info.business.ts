import { Injectable } from '@angular/core';
import { DeviceInfo } from '../../../../common/data-core/models/arm/device-info.model';
import { ArmSystemRequestService } from '../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class ManagementSystemDeviceInfoBusiness {
  constructor(private service: ArmSystemRequestService) {}

  load() {
    return this.service.device.get();
  }

  update(data: DeviceInfo) {
    if (!data.CustomizedInfo) {
      data.CustomizedInfo = undefined;
    }
    return this.service.device.update(data);
  }
}
