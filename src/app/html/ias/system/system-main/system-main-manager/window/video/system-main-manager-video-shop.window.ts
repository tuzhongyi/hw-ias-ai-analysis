import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { SystemTaskVideoArgs } from '../../../../system-task/system-task-video/system-task-video.model';

export class SystemMainManagerVideoShopWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.video.path,
  };
  data?: MobileEventRecord;
  title = '';
  args = new SystemTaskVideoArgs();

  change() {
    if (this.args) {
      this.args = Object.assign({}, this.args);
    }
  }
}
