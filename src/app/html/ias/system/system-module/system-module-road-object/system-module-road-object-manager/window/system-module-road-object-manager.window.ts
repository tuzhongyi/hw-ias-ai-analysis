import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { SystemModuleRoadObjectManagerComponent } from '../system-module-road-object-manager.component';
import { SystemModuleRoadObjectManagerDetailsWindow } from './system-module-road-object-manager-details.window';

export class SystemModuleRoadObjectManagerWindow {
  details: SystemModuleRoadObjectManagerDetailsWindow;
  constructor(that: SystemModuleRoadObjectManagerComponent) {
    this.details = new SystemModuleRoadObjectManagerDetailsWindow(that);
  }
  confirm = new ConfirmWindow();
}

class ConfirmWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  data?: RoadObject;

  get content() {
    return `是否删除物件 ${this.data?.Name} ？`;
  }
}
