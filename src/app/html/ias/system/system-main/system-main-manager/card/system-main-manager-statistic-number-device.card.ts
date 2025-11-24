import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { SystemMainManagerWindow } from '../window/system-main-manager.window';

export class SystemMainManagerCardStatisticNumberDevice {
  constructor(private window: SystemMainManagerWindow) {}

  duration = DateTimeTool.all.year(new Date());
}
