import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { Road } from '../../../../../../../common/data-core/models/arm/analysis/road.model';

export class SystemModuleRoadManagerWindow {
  confirm = new ConfirmWindow();
}

class ConfirmWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  data?: Road;

  get content() {
    return `是否删除道路 ${this.data?.Name} ？`;
  }
}
