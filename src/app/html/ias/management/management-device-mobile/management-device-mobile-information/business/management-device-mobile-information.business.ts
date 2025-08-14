import { Injectable } from '@angular/core';
import { MobileDevice } from '../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { Guid } from '../../../../../../common/tools/guid/guid';

@Injectable()
export class ManagementDeviceMobileInformationBusiness {
  constructor(private service: ArmSystemRequestService) {}
  create(data: MobileDevice) {
    data.Id = Guid.NewGuid().ToString('N');
    return this.service.mobile.device.create(data);
  }
  update(data: MobileDevice) {
    return this.service.mobile.device.update(data);
  }

  user = {
    group: () => {
      return this.service.security.user.group();
    },
  };
}
