import { ArmEventTriggerType } from '../../../../../../common/data-core/enums/event/arm-event-trigger-type.enum';
import { ArmEventType } from '../../../../../../common/data-core/enums/event/arm-event-type.enum';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { Duration } from '../../../../../../common/tools/date-time-tool/duration.model';

export interface ISystemEventTableArgs {
  duration: Duration;
  type?: ArmEventType;
  types: ArmEventType[];
  resource?: string;
  taskId?: string;
  confirmed?: boolean;
  state?: number;
  handle?: boolean;
  misinform?: boolean;
  timeout?: boolean;
  division?: string;
  gridcell?: string;
}

export class SystemEventTableArgs implements ISystemEventTableArgs {
  duration = DateTimeTool.last.month(new Date());
  types: ArmEventType[] = [];
  type?: ArmEventType;
  resource?: string;
  taskId?: string;
  first = false;
  confirmed?: boolean;
  state?: number;
  handle?: boolean;
  misinform?: boolean;
  timeout?: boolean;
  division?: string;
  gridcell?: string;
}

export class SystemEventTableFilter implements ISystemEventTableArgs {
  duration = DateTimeTool.last.month(new Date());
  type?: ArmEventType;
  types: ArmEventType[] = [];

  resource?: string;
  taskId?: string;
  confirmed?: boolean;
  state?: number;
  handle?: boolean;
  misinform?: boolean;
  timeout?: boolean;
  division?: string;
  gridcell?: string;
  asc?: string;
  desc?: string = 'EventTime';
  static from(args: ISystemEventTableArgs) {
    let filter = new SystemEventTableFilter();
    filter.duration = args.duration;
    filter.type = args.type;
    filter.resource = args.resource;
    filter.taskId = args.taskId;
    filter.types = args.types;
    filter.confirmed = args.confirmed;
    filter.state = args.state;
    filter.handle = args.handle;
    filter.misinform = args.misinform;
    filter.timeout = args.timeout;
    filter.division = args.division;
    filter.gridcell = args.gridcell;
    return filter;
  }
}

export class SystemEventTableItem extends MobileEventRecord {
  EventTypeName!: Promise<string>;
  EmergencyTypeName!: Promise<string>;
  ResourceName?: string;
  GridCellName?: Promise<string>;
  DivisionName?: Promise<string>;
}

interface SystemEventTableArgsType {
  event?: ArmEventType;
  trigger?: ArmEventTriggerType;
  live?: boolean;
}
