import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { SystemEventTableArgs } from '../../../../system-event/system-event-table/business/system-event-table.model';

export class SystemMainManagerRecordShopWindow extends WindowViewModel {
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
  title = '商铺变更';
  args = new SystemEventTableArgs();

  open(args: SystemEventTableArgs) {
    this.args = args;
    this.show = true;
  }
  close() {
    this.show = false;
  }
}
