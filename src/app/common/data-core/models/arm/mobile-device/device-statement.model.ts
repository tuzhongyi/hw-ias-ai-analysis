import { IIdModel } from '../../interface/model.interface';
import { DeviceDailyRouteStatistic } from './device-daily-route-statistic.model';

/**	DeviceStatement (车辆行驶周期统计结果)	*/
export class DeviceStatement implements IIdModel {
  /**	String	报表ID	M	*/
  Id!: string;
  /**	Int32	报表类型，1-周，2-月	M	*/
  StatementType!: number;
  /**	Date	开始日期	M	*/
  BeginDate!: Date;
  /**	Date	结束日期	M	*/
  EndDate!: Date;
  /**	String	设备ID	M	*/
  DeviceId!: string;
  /**	String	设备名称	M	*/
  DeviceName!: string;
  /**	String	区划ID，街道和区级	M	*/
  DivisonId!: string;
  /**	String	区划名称	O	*/
  DivisionName?: string;
  /**	DeviceDailyRouteStatistic[]	设备每日的统计内容	O	*/
  DailyRoutes?: DeviceDailyRouteStatistic[];
  /**	Int32	出勤天数	M	*/
  AttendanceNumber!: number;
}
