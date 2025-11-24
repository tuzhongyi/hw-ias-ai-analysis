import { Transform, Type } from 'class-transformer';
import { IIdNameModel } from '../../model.interface';
import { Transformer } from '../../transformer';
import { DeviceRoadStatistic } from './device-road-statistic.model';

/**	DeviceRoutesStatistic (车辆道路行驶统计结果)	*/
export class DeviceRoutesStatistic implements IIdNameModel {
  /**	String	车辆ID 	M	*/
  Id!: string;
  /**	String	车辆名称	M	*/
  Name!: string;
  /**	Double	行驶时长，单位：秒	M	*/
  MovingSeconds!: number;
  /**	Double	停留时长，单位：秒	M	*/
  StaySeconds!: number;
  /**	Double	总里程，单位：米	M	*/
  TotalMeters!: number;
  /**	Double	平均时速，单位：km/h	M	*/
  AvgSpeed!: number;
  /**	Double	最高时速，单位：km/h	M	*/
  FastestSpeed!: number;
  /**	DateTime	最早出现时间	M	*/
  @Transform(Transformer.DateTime)
  BeginTime!: Date;
  /**	DateTime	最后出现时间	M	*/
  @Transform(Transformer.DateTime)
  EndTime!: Date;
  /**	DeviceRoadStatistic[]	单条道路的统计信息	O	*/
  @Type(() => DeviceRoadStatistic)
  RoadStatistics?: DeviceRoadStatistic[];
}
