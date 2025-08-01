import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import {
  SystemModuleShopRegistrationMapManagerData,
  SystemModuleShopRegistrationMapManagerMap,
} from '../system-module-shop-registration-map-manager.model';
import { SystemModuleShopRegistrationMapManagerPanel } from './system-module-shop-registration-map-manager.panel';

export class SystemModuleShopRegistrationMapManagerListPanel {
  show = false;

  constructor(
    private map: SystemModuleShopRegistrationMapManagerMap,
    private data: SystemModuleShopRegistrationMapManagerData,
    private panel: SystemModuleShopRegistrationMapManagerPanel
  ) {}

  position(data: ShopRegistration) {
    this.map.focus.emit(data);
  }
  details(data: ShopRegistration) {
    this.data.selected = data;
    this.panel.details.show = true;
  }
  select(data: ShopRegistration) {
    this.data.selected = data;
  }
  item = {
    over: (data: ShopRegistration) => {
      this.map.over.emit(data);
    },
    out: (data: ShopRegistration) => {
      this.map.out.emit(data);
    },
  };
}
