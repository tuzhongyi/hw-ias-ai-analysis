import { SystemEventManagerRealtimeComponent } from '../system-event-manager-realtime.component';
import { SystemEventManagerRealtimeAssginWindow } from './system-event-manager-realtime-assgin.window';
import { SystemEventManagerRealtimeConfirmWindow } from './system-event-manager-realtime-confirm.window';
import { SystemEventManagerRealtimeDetailsWindow } from './system-event-manager-realtime-details.window';
import { SystemEventManagerRealtimeDownloadWindow } from './system-event-manager-realtime-download.window';
import { SystemEventManagerRealtimeEditNameWindow } from './system-event-manager-realtime-edit-name.window';
import { SystemEventManagerRealtimeMapWindow } from './system-event-manager-realtime-map.window';
import { SystemEventManagerRealtimePictureWindow } from './system-event-manager-realtime-picture.window';
import { SystemEventManagerRealtimeProcessWindow } from './system-event-manager-realtime-process.window';
import { SystemEventManagerRealtimeTaskWindow } from './system-event-manager-realtime-task.window';
import { SystemEventManagerRealtimeVideoWindow } from './system-event-manager-realtime-video.window';

export class SystemEventManagerRealtimeWindow {
  process: SystemEventManagerRealtimeProcessWindow;
  picture = new SystemEventManagerRealtimePictureWindow();
  task = new SystemEventManagerRealtimeTaskWindow();
  video = new SystemEventManagerRealtimeVideoWindow();
  confirm = new SystemEventManagerRealtimeConfirmWindow();
  edit = {
    name: new SystemEventManagerRealtimeEditNameWindow(),
  };
  details = new SystemEventManagerRealtimeDetailsWindow();

  map = new SystemEventManagerRealtimeMapWindow();
  assgin = new SystemEventManagerRealtimeAssginWindow();
  download = new SystemEventManagerRealtimeDownloadWindow();

  constructor(that: SystemEventManagerRealtimeComponent) {
    this.process = new SystemEventManagerRealtimeProcessWindow(that);
  }

  get opened() {
    return this.task.show || this.details.show || this.process.show;
  }
}
