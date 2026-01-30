import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { Duration } from '../../../../../../common/tools/date-time-tool/duration.model';

export interface ISystemEventRoadObjectTableArgs {
  duration: Duration;
  type?: number;
  confirmed?: boolean;
  assigned?: boolean;
  event?: number;
  misinform?: boolean;
  handled?: boolean;
  divisionId?: string;
  gridCellId?: string;
  name?: string;
}

export class SystemEventRoadObjectTableArgs
  implements ISystemEventRoadObjectTableArgs
{
  duration = DateTimeTool.all.month(new Date());
  type?: number;
  confirmed?: boolean;
  assigned?: boolean;
  event?: number;
  first = false;
  misinform?: boolean;
  handled?: boolean;
  divisionId?: string;
  gridCellId?: string;
  name?: string;
}
export class SystemEventRoadObjectTableFilter
  implements ISystemEventRoadObjectTableArgs
{
  duration = DateTimeTool.all.month(new Date());
  type?: number;
  confirmed?: boolean;
  assigned?: boolean;
  event?: number;
  desc?: string = 'Time';
  asc?: string;
  misinform?: boolean;
  handled?: boolean;
  divisionId?: string;
  gridCellId?: string;
  name?: string;

  static from(
    args: SystemEventRoadObjectTableArgs
  ): SystemEventRoadObjectTableFilter {
    let filter = new SystemEventRoadObjectTableFilter();
    filter.duration = args.duration;
    filter.type = args.type;
    filter.confirmed = args.confirmed;
    filter.event = args.event;
    filter.misinform = args.misinform;
    filter.handled = args.handled;
    filter.divisionId = args.divisionId;
    filter.gridCellId = args.gridCellId;
    filter.name = args.name;
    filter.assigned = args.assigned;
    return filter;
  }
}
export class SystemEventRoadObjectTableItem extends RoadObjectEventRecord {
  GridCellName?: Promise<string>;
  DivisionName?: Promise<string>;
  EventTypeName!: Promise<string>;
  RoadObjectTypeName!: Promise<string>;
}
