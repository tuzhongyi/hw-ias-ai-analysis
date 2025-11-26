import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';

export class SystemMainManagerTaskShopWindow extends WindowViewModel {
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
  title = 'AI分析任务';
  duration?: Duration;
}
