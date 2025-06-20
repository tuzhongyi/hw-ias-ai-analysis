import { Injectable } from '@angular/core';
import { ShopRegistration } from '../../../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { ArmGeographicRequestService } from '../../../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetShopRegistrationsParams } from '../../../../../../../../../common/data-core/requests/services/geographic/shop/geographic-shop.params';

@Injectable()
export class SystemTaskShopAnalysisTableShopRegistrationService {
  constructor(private service: ArmGeographicRequestService) {}

  private datas: ShopRegistration[] = [];

  async load() {
    if (this.datas.length > 0) {
      return this.datas;
    }
    let params = new GetShopRegistrationsParams();
    this.datas = await this.service.shop.cache.array(params);
    return this.datas;
  }
}
