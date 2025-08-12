import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';

export class SystemMainMapShopBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  load() {
    return this.service.shop.all();
  }
}
