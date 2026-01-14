import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { RoadSection } from '../../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { SystemModuleRoadSectionManagerComponent } from '../system-module-road-section-manager.component';
import { SystemModuleRoadSectionManagerDetailsWindow } from './system-module-road-section-manager-details.window';

export class SystemModuleRoadSectionManagerWindow {
  details: SystemModuleRoadSectionManagerDetailsWindow;
  constructor(that: SystemModuleRoadSectionManagerComponent) {
    this.details = new SystemModuleRoadSectionManagerDetailsWindow(that);
  }
  confirm = new ConfirmWindow();
}

class ConfirmWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  data?: RoadSection;

  get content() {
    return `是否删除路段 ${this.data?.Name} ？`;
  }
}
