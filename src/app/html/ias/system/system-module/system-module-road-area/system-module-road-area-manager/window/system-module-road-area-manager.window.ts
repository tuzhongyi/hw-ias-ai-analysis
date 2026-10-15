import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { RoadArea } from '../../../../../../../common/data-core/models/arm/geographic/road-area.model';
import { SystemModuleRoadAreaManagerComponent } from '../system-module-road-area-manager.component';
import { SystemModuleRoadAreaManagerDetailsWindow } from './system-module-road-area-manager-details.window';

export class SystemModuleRoadAreaManagerWindow {
  details: SystemModuleRoadAreaManagerDetailsWindow;
  constructor(that: SystemModuleRoadAreaManagerComponent) {
    this.details = new SystemModuleRoadAreaManagerDetailsWindow(that);
  }
  confirm = new ConfirmWindow();
}

class ConfirmWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  data?: RoadArea;

  get content() {
    return `是否删除区域道路 ${this.data?.Name} ？`;
  }
}
