import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { SetShopLocationsParams } from '../../../../../../../common/data-core/requests/services/geographic/shop/geographic-shop.params';

@Injectable()
export class SystemModuleShopRegistrationMapPanelLocationBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  preview(params: SetShopLocationsParams) {
    params.Previewed = true;
    return this.service.shop.location(params);
  }

  road = {
    load: () => {
      return this.service.road.all();
    },
  };
}
