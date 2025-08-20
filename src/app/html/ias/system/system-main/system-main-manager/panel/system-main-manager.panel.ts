import { SystemMainManagerWindow } from '../window/system-main-manager.window';
import { SystemMainManagerPanelButton } from './buttons/system-main-manager-buttons.panel';
import { SystemMainManagerPanelDetails } from './details/system-main-manager-details.panel';
import { SystemMainManagerPanelList } from './list/system-main-manager-list.panel';

export class SystemMainManagerPanel {
  list = new SystemMainManagerPanelList();
  details: SystemMainManagerPanelDetails;
  button: SystemMainManagerPanelButton;

  constructor(window: SystemMainManagerWindow) {
    this.button = new SystemMainManagerPanelButton(this);
    this.details = new SystemMainManagerPanelDetails(window);
  }
}
