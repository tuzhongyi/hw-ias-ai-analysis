import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { SystemEventGpsTaskTableArgs } from '../../../../system-event/system-event-gps-task/system-event-gps-task-table/system-event-gps-task-table.model';

export class SystemMainManagerRecordSampleWindow extends WindowViewModel {
  style = {
    width: '100%',
    height: 'calc(100% - 108px)',
    position: 'absolute',
    top: '108px',
    left: 0,
    paddingTop: 0,
    border: 'none',
    boxShadow: 'none',
    transform: 'none',
  };
  title = '定制场景事件';
  args = new SystemEventGpsTaskTableArgs();
}
