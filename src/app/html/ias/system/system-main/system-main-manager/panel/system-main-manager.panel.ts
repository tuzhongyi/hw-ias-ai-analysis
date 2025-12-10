import { SystemMainManagerComponent } from '../system-main-manager.component';
import { SystemMainManagerPanelButton } from './buttons/system-main-manager-buttons.panel';
import { SystemMainManagerPanelDetails } from './details/system-main-manager-details.panel';
import { SystemMainManagerPanelList } from './list/system-main-manager-list.panel';
import { SystemMainManagerPanelNavigation } from './navigation/system-main-manager-navigation.panel';
import { SystemMainManagerPanelStateRealtime } from './state/system-main-manager-state-realtime.panel';
import { SystemMainManagerPanelStateSample } from './state/system-main-manager-state-sample.panel';
import { SystemMainManagerPanelStateShop } from './state/system-main-manager-state-shop.panel';
import { SystemMainManagerPanelStateTimeout } from './state/system-main-manager-state-timeout.panel';

export class SystemMainManagerPanel {
  list = new SystemMainManagerPanelList();
  details: SystemMainManagerPanelDetails;
  button: SystemMainManagerPanelButton;
  navigation: SystemMainManagerPanelNavigation;
  state: {
    shop: SystemMainManagerPanelStateShop;
    realtime: SystemMainManagerPanelStateRealtime;
    timeout: SystemMainManagerPanelStateTimeout;
    sample: SystemMainManagerPanelStateSample;
  };

  constructor(that: SystemMainManagerComponent) {
    this.button = new SystemMainManagerPanelButton(this);
    this.details = new SystemMainManagerPanelDetails(that);
    this.navigation = new SystemMainManagerPanelNavigation(that);
    this.state = {
      shop: new SystemMainManagerPanelStateShop(that),
      realtime: new SystemMainManagerPanelStateRealtime(that),
      sample: new SystemMainManagerPanelStateSample(that),
      timeout: new SystemMainManagerPanelStateTimeout(that),
    };
  }
}
