import { SystemMainManagerComponent } from '../system-main-manager.component';
import { SystemMainManagerPanelButton } from './buttons/system-main-manager-buttons.panel';
import { SystemMainManagerPanelDetails } from './details/system-main-manager-details.panel';
import { SystemMainManagerPanelList } from './list/system-main-manager-list.panel';
import { SystemMainManagerPanelNavigation } from './navigation/system-main-manager-navigation.panel';

export class SystemMainManagerPanel {
  list = new SystemMainManagerPanelList();
  details: SystemMainManagerPanelDetails;
  button: SystemMainManagerPanelButton;
  navigation: SystemMainManagerPanelNavigation;

  constructor(that: SystemMainManagerComponent) {
    this.button = new SystemMainManagerPanelButton(this);
    this.details = new SystemMainManagerPanelDetails(that.window);
    this.navigation = new SystemMainManagerPanelNavigation(that);
  }
}
