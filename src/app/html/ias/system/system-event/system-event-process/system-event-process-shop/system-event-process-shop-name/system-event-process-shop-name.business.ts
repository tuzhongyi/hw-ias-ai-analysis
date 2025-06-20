import { Injectable } from '@angular/core';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemEventProcessShopNameBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  update(data: ShopRegistration): Promise<ShopRegistration> {
    return this.service.shop.update(data);
  }
}
