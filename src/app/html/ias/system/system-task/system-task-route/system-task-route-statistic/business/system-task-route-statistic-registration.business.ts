import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetShopRegistrationsParams } from '../../../../../../../common/data-core/requests/services/geographic/shop/geographic-shop.params';

@Injectable()
export class SystemTaskRouteStatisticRegistrationBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  async count() {
    let params = new GetShopRegistrationsParams();
    params.PageSize = 1;
    let paged = await this.service.shop.list(params);
    return paged.Page.TotalRecordCount;
  }

  async detected() {
    let params = new GetShopRegistrationsParams();
    params.PageSize = 1;
    params.AssociatedCount = 1;
    let paged = await this.service.shop.list(params);
    return paged.Page.TotalRecordCount;
  }
}
