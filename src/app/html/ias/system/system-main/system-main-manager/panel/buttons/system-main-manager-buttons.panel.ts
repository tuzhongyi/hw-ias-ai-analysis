import { SystemMainManagerPanel } from '../system-main-manager.panel';
import { SystemMainManagerPanelButtonList } from './system-main-manager-button-list.panel';

export class SystemMainManagerPanelButton {
  list: SystemMainManagerPanelButtonList;

  constructor(panel: SystemMainManagerPanel) {
    this.list = new SystemMainManagerPanelButtonList(panel);
  }
}
