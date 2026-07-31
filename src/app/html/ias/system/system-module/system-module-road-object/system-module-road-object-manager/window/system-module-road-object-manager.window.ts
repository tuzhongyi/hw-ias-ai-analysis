import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { RoadObjectState } from '../../../../../../../common/data-core/enums/road/road-object/road-object-state.enum';
import { SystemModuleRoadObjectManagerComponent } from '../system-module-road-object-manager.component';
import { SystemModuleRoadObjectManagerDetailsWindow } from './system-module-road-object-manager-details.window';
import { SystemModuleRoadObjectManagerFileWindow } from './system-module-road-object-manager-file.window';
import { SystemModuleRoadObjectManagerPictureWindow } from './system-module-road-object-manager-picture.window';
import { SystemModuleRoadObjectManagerStockWindow } from './system-module-road-object-manager-stock.window';
import { SystemModuleRoadObjectManagerVideoWindow } from './system-module-road-object-manager-video.window';

export class SystemModuleRoadObjectManagerWindow {
  details: SystemModuleRoadObjectManagerDetailsWindow;
  file: SystemModuleRoadObjectManagerFileWindow;
  video: SystemModuleRoadObjectManagerVideoWindow;
  picture: SystemModuleRoadObjectManagerPictureWindow;
  stock: SystemModuleRoadObjectManagerStockWindow;
  constructor(that: SystemModuleRoadObjectManagerComponent) {
    this.details = new SystemModuleRoadObjectManagerDetailsWindow(that);
    this.file = new SystemModuleRoadObjectManagerFileWindow(that);
    this.video = new SystemModuleRoadObjectManagerVideoWindow(that);
    this.picture = new SystemModuleRoadObjectManagerPictureWindow(that);
    this.stock = new SystemModuleRoadObjectManagerStockWindow(that);
  }
  confirm = new ConfirmWindow();

  get opened() {
    return this.details.show;
  }
}

class ConfirmWindow extends WindowViewModel {
  count = 0;
  data?: RoadObjectState;
  get content() {
    return `是否删除${this.count}个部件 ？`;
  }
}
