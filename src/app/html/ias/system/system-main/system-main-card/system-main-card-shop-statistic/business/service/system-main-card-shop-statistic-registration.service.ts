import { ShopObjectState } from '../../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ArmGeographicRequestService } from '../../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetShopRegistrationsParams } from '../../../../../../../../common/data-core/requests/services/geographic/shop/geographic-shop.params';

export class SystemMainCardShopStatisticRegistrationService {
  constructor(private service: ArmGeographicRequestService) {}

  load() {
    let params = new GetShopRegistrationsParams();
    params.AssociatedCount = 1;
    params.ObjectStates = [ShopObjectState.Created, ShopObjectState.Existed];
    return this.service.shop.cache.all(params).then((shops) => {
      return shops.filter((x) => !x.Removal);
    });
  }
}
