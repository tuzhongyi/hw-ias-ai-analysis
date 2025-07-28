import { SystemModuleShopRegistrationMapManagerAlignPanel } from './system-module-shop-registration-map-manager-align.panel';
import { SystemModuleShopRegistrationMapManagerDetailsPanel } from './system-module-shop-registration-map-manager-details.panel';
import { SystemModuleShopRegistrationMapManagerFilterPanel } from './system-module-shop-registration-map-manager-filter.panel';
import { SystemModuleShopRegistrationMapManagerListPanel } from './system-module-shop-registration-map-manager-list.panel';

export class SystemModuleShopRegistrationMapManagerPanel {
  list = new SystemModuleShopRegistrationMapManagerListPanel();
  filter = new SystemModuleShopRegistrationMapManagerFilterPanel();
  details = new SystemModuleShopRegistrationMapManagerDetailsPanel();
  align = new SystemModuleShopRegistrationMapManagerAlignPanel();
}
