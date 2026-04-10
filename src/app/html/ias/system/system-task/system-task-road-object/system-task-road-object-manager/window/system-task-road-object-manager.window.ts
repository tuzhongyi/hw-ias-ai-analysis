import { SystemTaskRoadObjectManagerComponent } from '../system-task-road-object-manager.component';
import { SystemTaskRoadObjectManagerDetailsWindow } from './details/system-task-road-object-manager-details.window';
import { SystemTaskRoadObjectManagerConfirmWindow } from './system-task-road-object-manager-confirm.window';
import { SystemTaskRoadObjectManagerFileWindow } from './system-task-road-object-manager-file.window';
import { SystemTaskRoadObjectManagerPictureWindow } from './system-task-road-object-manager-picture.window';
import { SystemTaskRoadObjectManagerVideoWindow } from './system-task-road-object-manager-video.window';

export class SystemTaskRoadObjectManagerWindow {
  confirm: SystemTaskRoadObjectManagerConfirmWindow;
  file: SystemTaskRoadObjectManagerFileWindow;
  video: SystemTaskRoadObjectManagerVideoWindow;
  picture: SystemTaskRoadObjectManagerPictureWindow;
  details: SystemTaskRoadObjectManagerDetailsWindow;

  constructor(that: SystemTaskRoadObjectManagerComponent) {
    this.confirm = new SystemTaskRoadObjectManagerConfirmWindow(that);
    this.file = new SystemTaskRoadObjectManagerFileWindow(that);
    this.video = new SystemTaskRoadObjectManagerVideoWindow(that);
    this.picture = new SystemTaskRoadObjectManagerPictureWindow(that);
    this.details = new SystemTaskRoadObjectManagerDetailsWindow(that);
  }

  get opened() {
    return this.details.object.show;
  }
}
