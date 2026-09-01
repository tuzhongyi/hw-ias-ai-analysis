import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { SystemEventVideoArgs } from '../../../system-event-video/system-event-video.model';

export class SystemEventManagerRealtimeVideoWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.video.path,
  };
  data?: MobileEventRecord;
  title = '';
  args: SystemEventVideoArgs = {
    duration: 5,
  };

  change() {
    if (this.args) {
      this.args = Object.assign({}, this.args);
    }
  }
}
