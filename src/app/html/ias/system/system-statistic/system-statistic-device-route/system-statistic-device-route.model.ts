import { DurationUnit } from '../../../../../common/tools/date-time-tool/duration.model';
export enum SystemStatisticDeviceRouteType {
  Meter,
  Speed,
  Time,
  CoveragePercent,
}
export class SystemStatisticDeviceRouteArgs {
  date = new Date();
  unit = DurationUnit.day;
  deviceId!: string;
}
export interface ISystemStatisticDeviceRouteInfo {
  TotalMeters: string;
  AvgSpeed: string;
  FastestSpeed: string;
  MovingTime: string;
  StayTime: string;
  CoveragePercent: string;
  Attendance?: number;
}
export interface ISystemStatisticDeviceRouteModel {
  Date: Date;
  /**	Double	行驶时长，单位：秒	M	*/
  MovingSeconds: number;
  /**	Double	停留时长，单位：秒	M	*/
  StaySeconds: number;
  /**	Double	总里程，单位：米	M	*/
  TotalMeters: number;
  /**	Double	平均时速，单位：km/h	M	*/
  AvgSpeed: number;
  /**	Double	最高时速，单位：km/h	M	*/
  FastestSpeed: number;
  /**	Int32	每日应行驶总里程，单位：米	O	*/
  DailyMeters?: number;
  /**	Double	行驶覆盖率，0-100	O	*/
  CoveragePercent?: number;
  /**	Boolean	是否出勤	M	*/
  Attendance?: boolean;
}
