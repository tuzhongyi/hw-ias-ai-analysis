import { GpsTaskSampleRecord } from '../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { Duration } from '../../../../../../common/tools/date-time-tool/duration.model';

export interface ISystemEventGspTaskTableArgs {
  duration: Duration;
  type?: number;
  confirmed?: number;
}

export class SystemEventGspTaskTableArgs
  implements ISystemEventGspTaskTableArgs
{
  duration = DateTimeTool.last.week(new Date(), 8);
  type?: number;
  first = false;
}
export class SystemEventGspTaskTableFilter
  implements ISystemEventGspTaskTableArgs
{
  duration = DateTimeTool.last.week(new Date(), 8);
  type?: number;
  desc?: string;
  asc?: string;

  static from(
    args: SystemEventGspTaskTableArgs
  ): SystemEventGspTaskTableFilter {
    let filter = new SystemEventGspTaskTableFilter();
    filter.duration = args.duration;
    filter.type = args.type;
    return filter;
  }
}
export class SystemEventGspTaskTableItem extends GpsTaskSampleRecord {}
