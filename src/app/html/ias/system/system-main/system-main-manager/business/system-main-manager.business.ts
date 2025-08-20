import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { SystemMainManagerDeviceBusiness } from './device/system-main-manager-device.business';
import { SystemMainManagerShopBusiness } from './shop/system-main-manager-shop.business';

@Injectable()
export class SystemMainManagerBusiness {
  shop: SystemMainManagerShopBusiness;
  device: SystemMainManagerDeviceBusiness;
  constructor(
    system: ArmSystemRequestService,
    geo: ArmGeographicRequestService
  ) {
    this.shop = new SystemMainManagerShopBusiness(geo);
    this.device = new SystemMainManagerDeviceBusiness(system);
  }
}
