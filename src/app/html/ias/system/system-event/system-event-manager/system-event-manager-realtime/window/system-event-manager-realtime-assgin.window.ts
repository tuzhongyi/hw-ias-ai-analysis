import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { MobileEventRecordMode } from '../../../system-event-map/system-event-map-panel/system-event-map-panel-record/system-event-map-panel-record-table/system-event-map-panel-record-table.model';

export class SystemEventManagerRealtimeAssginWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.middle,
  };
  title = '事件派单';
  data?: MobileEventRecord;
  mode = MobileEventRecordMode.realtime;
}
