import { GpsTaskSampleRecord } from '../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { Duration } from '../../../../../../common/tools/date-time-tool/duration.model';

export interface ISystemEventGpsTaskTableArgs {
  duration: Duration;
  type?: number;
  confirmed?: boolean;
  alarm?: boolean;
}

export class SystemEventGpsTaskTableArgs
  implements ISystemEventGpsTaskTableArgs
{
  duration = DateTimeTool.last.week(new Date(), 8);
  type?: number;
  confirmed?: boolean;
  alarm?: boolean;
  first = false;
}
export class SystemEventGpsTaskTableFilter
  implements ISystemEventGpsTaskTableArgs
{
  duration = DateTimeTool.last.week(new Date(), 8);
  type?: number;
  confirmed?: boolean;
  alarm?: boolean;
  desc?: string;
  asc?: string;

  static from(
    args: SystemEventGpsTaskTableArgs
  ): SystemEventGpsTaskTableFilter {
    let filter = new SystemEventGpsTaskTableFilter();
    filter.duration = args.duration;
    filter.type = args.type;
    filter.confirmed = args.confirmed;
    filter.alarm = args.alarm;
    return filter;
  }
}
export class SystemEventGpsTaskTableItem extends GpsTaskSampleRecord {}
