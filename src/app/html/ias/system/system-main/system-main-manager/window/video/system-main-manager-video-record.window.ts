import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { EnumNameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { SystemEventVideoArgs } from '../../../../system-event/system-event-video/system-event-video.model';

export class SystemMainManagerVideoRecordWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.video.path,
  };
  data?: MobileEventRecord;
  title = '';
  args: SystemEventVideoArgs = {
    duration: 5,
  };
  channels: EnumNameValue<number>[] = [];

  change() {
    if (this.args) {
      this.args = Object.assign({}, this.args);
    }
  }
}
