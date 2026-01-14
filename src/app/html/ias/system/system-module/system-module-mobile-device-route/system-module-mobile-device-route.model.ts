import { DateTimeTool } from '../../../../../common/tools/date-time-tool/datetime.tool';
import { DurationUnit } from '../../../../../common/tools/date-time-tool/duration.model';

export class SystemModuleMobileDeviceRouteArgs {
  duration = DateTimeTool.all.day(new Date());
  unit = DurationUnit.day;
  deviceId!: string;
}
export enum SystemModuleMobileDeviceRouteType {
  Meter,
  Speed,
  Time,
}
