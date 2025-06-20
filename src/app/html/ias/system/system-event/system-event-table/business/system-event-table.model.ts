import { ArmEventTriggerType } from '../../../../../../common/data-core/enums/event/arm-event-trigger-type.enum';
import { ArmEventType } from '../../../../../../common/data-core/enums/event/arm-event-type.enum';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { Duration } from '../../../../../../common/tools/date-time-tool/duration.model';

export interface ISystemEventTableArgs {
  duration: Duration;
  type?: ArmEventType;
  state?: number;
  resource?: string;
}

export class SystemEventTableArgs implements ISystemEventTableArgs {
  duration = DateTimeTool.last.month(new Date());
  type?: ArmEventType;
  state?: number;
  resource?: string;
  first = false;
}

export class SystemEventTableFilter implements ISystemEventTableArgs {
  duration = DateTimeTool.last.month(new Date());
  type?: ArmEventType | undefined;
  state?: number | undefined;
  resource?: string | undefined;
  static from(args: ISystemEventTableArgs) {
    let filter = new SystemEventTableFilter();
    filter.duration = args.duration;
    filter.type = args.type;
    filter.state = args.state;
    filter.resource = args.resource;
    return filter;
  }
}

export class SystemEventTableItem extends MobileEventRecord {
  EventTypeName!: Promise<string>;
}

interface SystemEventTableArgsType {
  event?: ArmEventType;
  trigger?: ArmEventTriggerType;
  live?: boolean;
}
