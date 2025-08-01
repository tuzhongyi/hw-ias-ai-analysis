import {
  SystemModuleShopRegistrationMapManagerData,
  SystemModuleShopRegistrationMapManagerMap,
} from '../system-module-shop-registration-map-manager.model';
import { SystemModuleShopRegistrationMapManagerWindow } from '../system-module-shop-registration-map-manager.window';
import { SystemModuleShopRegistrationMapManagerHistoryChangedPanel } from './system-module-shop-registration-map-manager-history-changed.panel';

export class SystemModuleShopRegistrationMapManagerHistoryPanel {
  changed: SystemModuleShopRegistrationMapManagerHistoryChangedPanel;
  constructor(
    map: SystemModuleShopRegistrationMapManagerMap,
    data: SystemModuleShopRegistrationMapManagerData,
    window: SystemModuleShopRegistrationMapManagerWindow
  ) {
    this.changed =
      new SystemModuleShopRegistrationMapManagerHistoryChangedPanel(
        map,
        data,
        window
      );
  }
}
