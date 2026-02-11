import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { SystemModuleRoadObjectManagerComponent } from '../system-module-road-object-manager.component';
import { SystemModuleRoadObjectManagerDetailsWindow } from './system-module-road-object-manager-details.window';
import { SystemModuleRoadObjectManagerFileWindow } from './system-module-road-object-manager-file.window';
import { SystemModuleRoadObjectManagerPictureWindow } from './system-module-road-object-manager-picture.window';
import { SystemModuleRoadObjectManagerVideoWindow } from './system-module-road-object-manager-video.window';

export class SystemModuleRoadObjectManagerWindow {
  details: SystemModuleRoadObjectManagerDetailsWindow;
  file: SystemModuleRoadObjectManagerFileWindow;
  video: SystemModuleRoadObjectManagerVideoWindow;
  picture: SystemModuleRoadObjectManagerPictureWindow;
  constructor(that: SystemModuleRoadObjectManagerComponent) {
    this.details = new SystemModuleRoadObjectManagerDetailsWindow(that);
    this.file = new SystemModuleRoadObjectManagerFileWindow(that);
    this.video = new SystemModuleRoadObjectManagerVideoWindow(that);
    this.picture = new SystemModuleRoadObjectManagerPictureWindow(that);
  }
  confirm = new ConfirmWindow();

  get opened() {
    return this.details.show;
  }
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
