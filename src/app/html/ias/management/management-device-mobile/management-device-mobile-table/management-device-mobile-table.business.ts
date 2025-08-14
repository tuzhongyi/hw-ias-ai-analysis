import { Injectable } from '@angular/core';
import { GetMobileDevicesParams } from '../../../../../common/data-core/requests/services/system/mobile/system-mobile-device.params';
import { ArmSystemRequestService } from '../../../../../common/data-core/requests/services/system/system.service';
import { ManagementDeviceMobileTableFilter } from './management-device-mobile-table.model';

@Injectable()
export class ManagementDeviceMobileTableBusiness {
  constructor(private service: ArmSystemRequestService) {}

  load(index: number, size: number, filter: ManagementDeviceMobileTableFilter) {
    let params = new GetMobileDevicesParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.OnlineStatus = filter.online;
    params.Name = filter.name;
    params.GroupId = filter.group;
    return this.service.mobile.device.list(params);
  }
}
