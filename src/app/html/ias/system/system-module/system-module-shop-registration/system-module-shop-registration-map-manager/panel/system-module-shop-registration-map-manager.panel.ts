import { SystemModuleShopRegistrationMapManagerPanelArgs } from '../system-module-shop-registration-map-manager.model';
import { SystemModuleShopRegistrationMapManagerAlignPanel } from './system-module-shop-registration-map-manager-align.panel';
import { SystemModuleShopRegistrationMapManagerDetailsPanel } from './system-module-shop-registration-map-manager-details.panel';
import { SystemModuleShopRegistrationMapManagerFilterPanel } from './system-module-shop-registration-map-manager-filter.panel';
import { SystemModuleShopRegistrationMapManagerHistoryPanel } from './system-module-shop-registration-map-manager-history.panel';
import { SystemModuleShopRegistrationMapManagerListPanel } from './system-module-shop-registration-map-manager-list.panel';
import { SystemModuleShopRegistrationMapManagerLocationPanel } from './system-module-shop-registration-map-manager-location.panel';
import { SystemModuleShopRegistrationMapManagerSearchPanel } from './system-module-shop-registration-map-manager-search.panel';
import { SystemModuleShopRegistrationMapManagerSettingsPanel } from './system-module-shop-registration-map-manager-settings.panel';

export class SystemModuleShopRegistrationMapManagerPanel {
  filter = new SystemModuleShopRegistrationMapManagerFilterPanel();
  details = new SystemModuleShopRegistrationMapManagerDetailsPanel();
  align = new SystemModuleShopRegistrationMapManagerAlignPanel();

  search = new SystemModuleShopRegistrationMapManagerSearchPanel();
  settings = new SystemModuleShopRegistrationMapManagerSettingsPanel();

  list: SystemModuleShopRegistrationMapManagerListPanel;
  location: SystemModuleShopRegistrationMapManagerLocationPanel;
  history: SystemModuleShopRegistrationMapManagerHistoryPanel;

  constructor(args: SystemModuleShopRegistrationMapManagerPanelArgs) {
    this.list = new SystemModuleShopRegistrationMapManagerListPanel(
      args.map,
      args.data,
      this
    );
    this.history = new SystemModuleShopRegistrationMapManagerHistoryPanel(
      args.map,
      args.data,
      args.window
    );
    this.location = new SystemModuleShopRegistrationMapManagerLocationPanel(
      args.map,
      args.data,
      args.window,
      this
    );
  }
}
