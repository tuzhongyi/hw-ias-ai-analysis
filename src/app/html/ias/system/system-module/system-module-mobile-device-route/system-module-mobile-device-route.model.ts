import { DurationUnit } from '../../../../../common/tools/date-time-tool/duration.model';

export class SystemModuleMobileDeviceRouteArgs {
  date = new Date();
  unit = DurationUnit.day;
  deviceId!: string;
}
export enum SystemModuleMobileDeviceRouteType {
  Meter,
  Speed,
  Time,
}
