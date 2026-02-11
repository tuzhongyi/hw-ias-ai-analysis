import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';
import { SystemEventRoadObjectTableArgs } from '../../../../system-event/system-event-road-object/system-event-road-object-table/system-event-road-object-table.model';
import { SystemMainManagerComponent } from '../../system-main-manager.component';

export class SystemMainManagerCardRoadObjectStatisticPie {
  show = false;
  duration = DateTimeTool.all.month(new Date());
  constructor(private that: SystemMainManagerComponent) {}

  on = {
    type: (type: number) => {
      let args = new SystemEventRoadObjectTableArgs();
      args.duration = this.duration;
      args.confirmed = true;
      args.misinform = false;
      args.event = type;
      this.that.window.record.roadobject.open(args);
    },
    duration: (duration: Duration) => {
      this.duration = duration;
    },
  };
}
