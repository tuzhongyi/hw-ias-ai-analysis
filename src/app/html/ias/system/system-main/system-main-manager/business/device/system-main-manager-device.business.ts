import { GetMobileDevicesParams } from '../../../../../../../common/data-core/requests/services/system/mobile/system-mobile-device.params';
import { ArmSystemRequestService } from '../../../../../../../common/data-core/requests/services/system/system.service';

export class SystemMainManagerDeviceBusiness {
  constructor(private service: ArmSystemRequestService) {}

  load() {
    let params = new GetMobileDevicesParams();
    params.DeviceType = 1;
    return this.service.mobile.device.all(params);
  }
}
