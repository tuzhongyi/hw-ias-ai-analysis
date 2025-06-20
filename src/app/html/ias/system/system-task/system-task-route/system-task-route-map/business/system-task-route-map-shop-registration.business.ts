import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetShopRegistrationsParams } from '../../../../../../../common/data-core/requests/services/geographic/shop/geographic-shop.params';

@Injectable()
export class SystemTaskRouteMapShopRegistrationBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  load() {
    let params = new GetShopRegistrationsParams();
    return this.service.shop.cache.array(params);
  }
}
