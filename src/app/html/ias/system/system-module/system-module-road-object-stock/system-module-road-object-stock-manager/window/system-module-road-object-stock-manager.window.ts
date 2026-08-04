import { SystemModuleRoadObjectStockManagerComponent } from '../system-module-road-object-stock-manager.component';
import { SystemModuleRoadObjectStockManagerDetailsWindow } from './system-module-road-object-stock-manager-details.window';
import { SystemModuleRoadObjectStockManagerTransformWindow } from './system-module-road-object-stock-manager-transform.window';
import { SystemModuleRoadObjectStockManagerConfirmWindow } from './system-module-road-object-stock-manager-window-confirm';

export class SystemModuleRoadObjectStockManagerWindow {
  details: SystemModuleRoadObjectStockManagerDetailsWindow;
  transform: SystemModuleRoadObjectStockManagerTransformWindow;
  confirm: SystemModuleRoadObjectStockManagerConfirmWindow;

  constructor(that: SystemModuleRoadObjectStockManagerComponent) {
    this.details = new SystemModuleRoadObjectStockManagerDetailsWindow(that);
    this.transform = new SystemModuleRoadObjectStockManagerTransformWindow(that);
    this.confirm = new SystemModuleRoadObjectStockManagerConfirmWindow(that);
  }
}
