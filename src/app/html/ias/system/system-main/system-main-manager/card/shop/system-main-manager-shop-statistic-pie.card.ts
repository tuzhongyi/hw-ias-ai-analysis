import { ArmEventType } from '../../../../../../../common/data-core/enums/event/arm-event-type.enum';
import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';
import { SystemMainManagerComponent } from '../../system-main-manager.component';

/** 商铺任务统计 */
export class SystemMainManagerCardShopStatisticPie {
  show = false;
  duration = DateTimeTool.all.year(new Date());
  constructor(private that: SystemMainManagerComponent) {}
  on = {
    item: (type: ArmEventType) => {
      this.that.window.record.shop.args.duration = this.duration;
      this.that.window.record.shop.args.type = type;
      this.that.window.record.shop.show = true;
    },
    duration: (duration: Duration) => {
      this.duration = duration;
      this.that.window.record.shop.args.duration = duration;
    },
  };
}
