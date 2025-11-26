import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { SystemEventTableArgs } from '../../../system-event/system-event-table/business/system-event-table.model';
import { EventMode } from '../../system-main-map-navigation/system-main-map-navigation.model';
import { SystemMainManagerComponent } from '../system-main-manager.component';

export class SystemMainManagerCardEventStatisticPie {
  show = false;
  duration = DateTimeTool.all.year(new Date());
  constructor(private that: SystemMainManagerComponent) {}
  private get window() {
    return this.that.window;
  }

  on = {
    item: (mode: EventMode) => {
      switch (mode) {
        case EventMode.shop:
          let shopargs = new SystemEventTableArgs();
          shopargs.duration = this.duration;
          shopargs.misinform = false;
          this.window.record.shop.open(shopargs);
          break;
        case EventMode.realtime:
          let realtimeargs = new SystemEventTableArgs();
          realtimeargs.duration = this.duration;
          realtimeargs.misinform = false;
          this.window.record.realtime.open(realtimeargs);
          break;
        case EventMode.gpstask:
          this.window.record.sample.duration = this.duration;
          this.window.record.sample.show = true;
          break;
        // case 'task':
        //   this.window.task.duration = this.duration;
        //   this.window.task.show = true;
        //   break;

        default:
          break;
      }
    },
  };
}
