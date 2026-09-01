import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';

export class SystemEventManagerRealtimeTaskWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.middle,
  };
  data?: MobileEventRecord;
}
