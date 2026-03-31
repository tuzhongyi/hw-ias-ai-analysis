import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { RoadPoint } from '../../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { SystemModuleRoadPointManagerComponent } from '../system-module-road-point-manager.component';
import { SystemModuleRoadPointManagerDetailsWindow } from './system-module-road-point-manager-details.window';

export class SystemModuleRoadPointManagerWindow {
  details: SystemModuleRoadPointManagerDetailsWindow;
  constructor(that: SystemModuleRoadPointManagerComponent) {
    this.details = new SystemModuleRoadPointManagerDetailsWindow(that);
  }
  confirm = new ConfirmWindow();
}

class ConfirmWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  data?: RoadPoint;

  get content() {
    return `是否删除路段 ${this.data?.Name} ？`;
  }
}
