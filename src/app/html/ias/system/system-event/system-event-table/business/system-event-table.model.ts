import { ArmEventTriggerType } from '../../../../../../common/data-core/enums/event/arm-event-trigger-type.enum';
import { ArmEventType } from '../../../../../../common/data-core/enums/event/arm-event-type.enum';
import { EventRecord } from '../../../../../../common/data-core/models/arm/event/event-record.model';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';

export class SystemEventTableArgs {
  duration = DateTimeTool.last.year(new Date());
  type?: ArmEventType;
  state?: number;
}

export class SystemEventTableFilter extends SystemEventTableArgs {
  static from(args: SystemEventTableArgs) {
    return Object.assign(this, args);
  }
}

export class SystemEventTableItem extends EventRecord {
  EventTypeName!: Promise<string>;
}

interface SystemEventTableArgsType {
  event?: ArmEventType;
  trigger?: ArmEventTriggerType;
  live?: boolean;
}
