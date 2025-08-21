import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { SystemMainManagerWindow } from '../window/system-main-manager.window';

export class SystemMainManagerCardEventRealtimeStatistic {
  constructor(private window: SystemMainManagerWindow) {}

  duration = DateTimeTool.all.year(new Date());

  on = {
    type: (type: number) => {
      this.window.record.realtime.duration = this.duration;
      this.window.record.realtime.emergency = type;
      this.window.record.realtime.show = true;
    },
  };
}
