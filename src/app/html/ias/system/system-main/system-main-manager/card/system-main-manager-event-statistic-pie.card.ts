import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { Duration } from '../../../../../../common/tools/date-time-tool/duration.model';
import { SystemEventGpsTaskTableArgs } from '../../../system-event/system-event-gps-task/system-event-gps-task-table/system-event-gps-task-table.model';
import { SystemEventRoadObjectTableArgs } from '../../../system-event/system-event-road-object/system-event-road-object-table/system-event-road-object-table.model';
import { SystemEventTableArgs } from '../../../system-event/system-event-table/business/system-event-table.model';
import { EventMode } from '../../system-main-map-navigation/system-main-map-navigation.model';
import { SystemMainManagerComponent } from '../system-main-manager.component';

export class SystemMainManagerCardEventStatisticPie {
  show = false;
  duration = DateTimeTool.all.month(new Date());
  constructor(private that: SystemMainManagerComponent) {}
  private get window() {
    return this.that.window;
  }

  on = {
    item: (mode: EventMode, duration?: Duration, timeout?: boolean) => {
      switch (mode) {
        case EventMode.shop:
          let shopargs = new SystemEventTableArgs();
          shopargs.duration = duration ?? this.duration;
          shopargs.misinform = false;
          this.window.record.shop.open(shopargs);
          break;
        case EventMode.realtime:
          let realtimeargs = new SystemEventTableArgs();
          realtimeargs.duration = duration ?? this.duration;
          realtimeargs.misinform = false;
          realtimeargs.confirmed = true;
          realtimeargs.timeout = timeout;
          this.window.record.realtime.open(realtimeargs);
          break;
        case EventMode.gpstask:
          let sampleargs = new SystemEventGpsTaskTableArgs();
          sampleargs.alarm = true;
          sampleargs.duration = duration ?? this.duration;
          this.window.record.sample.args = sampleargs;
          this.window.record.sample.show = true;
          break;
        case EventMode.roadobject:
          let objectargs = new SystemEventRoadObjectTableArgs();
          objectargs.duration = duration ?? this.duration;
          objectargs.confirmed = true;
          objectargs.misinform = false;
          this.window.record.roadobject.args = objectargs;
          this.window.record.roadobject.show = true;
          break;

        default:
          break;
      }
    },
  };
}
