import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';

export class SystemTaskRouteMapManagerDetailsPanel {
  show = false;
  data?: ShopRegistration;

  on = {
    picture: (data: ShopRegistration) => {},
  };
}
