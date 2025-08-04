import {
  SystemModuleShopRegistrationMapManagerData,
  SystemModuleShopRegistrationMapManagerMap,
} from '../system-module-shop-registration-map-manager.model';
import { SystemModuleShopRegistrationMapManagerWindow } from '../system-module-shop-registration-map-manager.window';
import { SystemModuleShopRegistrationMapManagerHistoryLocationPanel } from './system-module-shop-registration-map-manager-history-location.panel';
import { SystemModuleShopRegistrationMapManagerHistoryRemovedPanel } from './system-module-shop-registration-map-manager-history-removed.panel';
import { SystemModuleShopRegistrationMapManagerPanel } from './system-module-shop-registration-map-manager.panel';

export class SystemModuleShopRegistrationMapManagerHistoryPanel {
  location: SystemModuleShopRegistrationMapManagerHistoryLocationPanel;
  removed: SystemModuleShopRegistrationMapManagerHistoryRemovedPanel;
  constructor(
    map: SystemModuleShopRegistrationMapManagerMap,
    data: SystemModuleShopRegistrationMapManagerData,
    window: SystemModuleShopRegistrationMapManagerWindow,
    panel: SystemModuleShopRegistrationMapManagerPanel
  ) {
    this.location =
      new SystemModuleShopRegistrationMapManagerHistoryLocationPanel(
        map,
        data,
        window,
        panel
      );
    this.removed =
      new SystemModuleShopRegistrationMapManagerHistoryRemovedPanel(
        map,
        data,
        window,
        panel
      );
  }
}
