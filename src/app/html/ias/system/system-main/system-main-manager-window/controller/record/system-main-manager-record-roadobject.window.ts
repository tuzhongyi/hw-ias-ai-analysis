import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { SystemEventRoadObjectTableArgs } from '../../../../system-event/system-event-road-object/system-event-road-object-table/system-event-road-object-table.model';

export class SystemMainManagerRecordRoadobjectWindow extends WindowViewModel {
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
  title = '实时事件';
  args = new SystemEventRoadObjectTableArgs();

  open(args: SystemEventRoadObjectTableArgs) {
    this.args = args;
    this.show = true;
  }
  close() {
    this.show = false;
  }
}
