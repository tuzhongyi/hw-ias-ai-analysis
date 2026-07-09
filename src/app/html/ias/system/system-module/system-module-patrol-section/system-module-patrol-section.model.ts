import { DateTimeTool } from '../../../../../common/tools/date-time-tool/datetime.tool';

export class SystemModulePatrolSectionMapArgs {
  duration = DateTimeTool.all.day(new Date());
  precision?: boolean;
  deviceId?: string;
}
export class SystemModulePatrolSectionTableArgs {
  name?: string;
}
