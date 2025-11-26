import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';
import { SystemEventTableArgs } from '../../../../system-event/system-event-table/business/system-event-table.model';
import { SystemMainManagerComponent } from '../../system-main-manager.component';

export class SystemMainManagerCardRealtimeStatistic {
  show = false;
  duration = DateTimeTool.all.year(new Date());
  constructor(private that: SystemMainManagerComponent) {}

  on = {
    type: (type: number) => {
      let args = new SystemEventTableArgs();
      args.duration = this.duration;
      args.type = type;
      this.that.window.record.realtime.open(args);
    },
    duration: (duration: Duration) => {
      this.duration = duration;
    },
  };
}
