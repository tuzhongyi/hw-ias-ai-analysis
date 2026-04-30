import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { Duration } from '../../../../../../common/tools/date-time-tool/duration.model';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';

export interface ISystemEventRoadObjectTableArgs {
  duration: Duration;
  type?: number;
  types: number[];
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
  duration = DateTimeTool.last.month(new Date());
  type?: number;
  types: number[] = [];
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
  types: number[] = [];
  confirmed?: boolean;
  assigned?: boolean;
  event?: number;
  desc?: string = 'EventTime';
  asc?: string;
  misinform?: boolean;
  handled?: boolean;
  divisionId?: string;
  gridCellId?: string;
  name?: string;

  static from(
    args: SystemEventRoadObjectTableArgs
  ): SystemEventRoadObjectTableFilter {
    let filter = ObjectTool.assign(args, SystemEventRoadObjectTableFilter);
    return filter;
  }
}
export class SystemEventRoadObjectTableItem extends RoadObjectEventRecord {
  GridCellName?: Promise<string>;
  DivisionName?: Promise<string>;
  EventTypeName!: Promise<string>;
  RoadObjectTypeName!: Promise<string>;

  VideoUrl?: string;
}
