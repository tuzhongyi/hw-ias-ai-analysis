import { SystemMainManagerComponent } from '../system-main-manager.component';
import { SystemMainManagerPanelButton } from './buttons/system-main-manager-buttons.panel';
import { SystemMainManagerPanelRoadObjectDetails } from './details/system-main-manager-details-road-object.panel';
import { SystemMainManagerPanelShopDetails } from './details/system-main-manager-details-shop.panel';
import { SystemMainManagerPanelList } from './list/system-main-manager-list.panel';
import { SystemMainManagerPanelNavigation } from './navigation/system-main-manager-navigation.panel';
import { SystemMainManagerPanelStateRealtime } from './state/system-main-manager-state-realtime.panel';
import { SystemMainManagerPanelRoadObject } from './state/system-main-manager-state-road-object.panel';
import { SystemMainManagerPanelStateSample } from './state/system-main-manager-state-sample.panel';
import { SystemMainManagerPanelStateShop } from './state/system-main-manager-state-shop.panel';
import { SystemMainManagerPanelStateTimeout } from './state/system-main-manager-state-timeout.panel';

export class SystemMainManagerPanel {
  list = new SystemMainManagerPanelList();

  details: {
    shop: SystemMainManagerPanelShopDetails;
    object: SystemMainManagerPanelRoadObjectDetails;
  };

  button: SystemMainManagerPanelButton;
  navigation: SystemMainManagerPanelNavigation;
  state: {
    shop: SystemMainManagerPanelStateShop;
    realtime: SystemMainManagerPanelStateRealtime;
    timeout: SystemMainManagerPanelStateTimeout;
    sample: SystemMainManagerPanelStateSample;
    roadobject: SystemMainManagerPanelRoadObject;
  };

  constructor(that: SystemMainManagerComponent) {
    this.button = new SystemMainManagerPanelButton(this);
    this.details = {
      shop: new SystemMainManagerPanelShopDetails(that),
      object: new SystemMainManagerPanelRoadObjectDetails(that),
    };
    this.navigation = new SystemMainManagerPanelNavigation(that);
    this.state = {
      shop: new SystemMainManagerPanelStateShop(that),
      realtime: new SystemMainManagerPanelStateRealtime(that),
      sample: new SystemMainManagerPanelStateSample(that),
      timeout: new SystemMainManagerPanelStateTimeout(that),
      roadobject: new SystemMainManagerPanelRoadObject(that),
    };
  }
}
