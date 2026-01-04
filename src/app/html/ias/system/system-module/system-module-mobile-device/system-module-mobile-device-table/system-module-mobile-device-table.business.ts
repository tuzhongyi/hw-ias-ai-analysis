import { Injectable } from '@angular/core';
import { GetMobileDevicesParams } from '../../../../../../common/data-core/requests/services/system/mobile/system-mobile-device.params';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { SystemModuleMobileDeviceTableArgs } from './system-module-mobile-device-table.model';

@Injectable()
export class SystemModuleMobileDeviceTableBusiness {
  constructor(private service: ArmSystemRequestService) {}

  async load(args: SystemModuleMobileDeviceTableArgs) {
    let datas = await this.data(args);
    return datas;
  }

  private data(args: SystemModuleMobileDeviceTableArgs) {
    let params = new GetMobileDevicesParams();
    params.Name = args.name;
    return this.service.mobile.device.all(params);
  }
}
