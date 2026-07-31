import { SystemModuleRoadObjectStockManagerComponent } from '../system-module-road-object-stock-manager.component';
import { SystemModuleRoadObjectStockManagerDetailsWindow } from './system-module-road-object-stock-manager-details.window';
import { SystemModuleRoadObjectStockManagerConfirmWindow } from './system-module-road-object-stock-manager-window-confirm';

export class SystemModuleRoadObjectStockManagerWindow {
  details: SystemModuleRoadObjectStockManagerDetailsWindow;
  confirm: SystemModuleRoadObjectStockManagerConfirmWindow;

  constructor(that: SystemModuleRoadObjectStockManagerComponent) {
    this.details = new SystemModuleRoadObjectStockManagerDetailsWindow(that);
    this.confirm = new SystemModuleRoadObjectStockManagerConfirmWindow(that);
  }
}
