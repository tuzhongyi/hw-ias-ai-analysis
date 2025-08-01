import { ArmEventTriggerType } from '../../../../../../common/data-core/enums/event/arm-event-trigger-type.enum';
import { ArmEventType } from '../../../../../../common/data-core/enums/event/arm-event-type.enum';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { Duration } from '../../../../../../common/tools/date-time-tool/duration.model';

export interface ISystemEventTableArgs {
  duration: Duration;
  type?: ArmEventType;
  types: ArmEventType[];
  state?: number;
  resource?: string;
  taskId?: string;
}

export class SystemEventTableArgs implements ISystemEventTableArgs {
  duration = DateTimeTool.last.month(new Date());
  types: ArmEventType[] = [];
  type?: ArmEventType;
  state?: number;
  resource?: string;
  taskId?: string;
  first = false;
}

export class SystemEventTableFilter implements ISystemEventTableArgs {
  duration = DateTimeTool.last.month(new Date());
  type?: ArmEventType;
  types: ArmEventType[] = [];
  state?: number;
  resource?: string;
  taskId?: string;
  static from(args: ISystemEventTableArgs) {
    let filter = new SystemEventTableFilter();
    filter.duration = args.duration;
    filter.type = args.type;
    filter.state = args.state;
    filter.resource = args.resource;
    filter.taskId = args.taskId;
    filter.types = args.types;
    return filter;
  }
}

export class SystemEventTableItem extends MobileEventRecord {
  EventTypeName!: Promise<string>;
  ResourceName?: string;
}

interface SystemEventTableArgsType {
  event?: ArmEventType;
  trigger?: ArmEventTriggerType;
  live?: boolean;
}
