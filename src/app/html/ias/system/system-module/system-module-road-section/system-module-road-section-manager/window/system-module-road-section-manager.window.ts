import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';
import { SystemModuleRoadSectionManagerDetailsWindow } from './system-module-road-section-manager-details.window';

export class SystemModuleRoadSectionManagerWindow {
  confirm = new ConfirmWindow();
  details = new SystemModuleRoadSectionManagerDetailsWindow();
}

class ConfirmWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  data?: Road;

  get content() {
    return `是否删除路段 ${this.data?.Name} ？`;
  }
}
