import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { SystemEventMapArgs } from '../../../system-event-map/system-event-map-manager/system-event-map-manager.model';
import { MobileEventRecordMode } from '../../../system-event-map/system-event-map-panel/system-event-map-panel-record/system-event-map-panel-record-table/system-event-map-panel-record-table.model';

export class SystemEventManagerRealtimeMapWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.max,
  };
  title = '实时事件';
  args = new SystemEventMapArgs();
  mode = MobileEventRecordMode.realtime;
}
