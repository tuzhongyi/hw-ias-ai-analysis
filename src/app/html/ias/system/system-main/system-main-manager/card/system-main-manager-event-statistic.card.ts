import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { SystemMainManagerWindow } from '../window/system-main-manager.window';

export class SystemMainManagerCardEventStatistic {
  constructor(private window: SystemMainManagerWindow) {}
  duration = DateTimeTool.all.year(new Date());
  on = {
    item: (type: string) => {
      switch (type) {
        case 'shop':
          this.window.record.shop.duration = this.duration;
          this.window.record.shop.show = true;
          break;
        case 'realtime':
          this.window.record.realtime.duration = this.duration;
          this.window.record.realtime.type = undefined;
          this.window.record.realtime.show = true;
          break;
        case 'analysis':
          this.window.record.analysis.duration = this.duration;
          this.window.record.analysis.show = true;
          break;
        case 'task':
          this.window.task.duration = this.duration;
          this.window.task.show = true;
          break;

        default:
          break;
      }
    },
  };
}
