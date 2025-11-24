import { Transform } from 'class-transformer';
import { IModel } from '../../model.interface';
import { Transformer } from '../../transformer';

/**	DeviceRoadStatistic (车辆道路统计结果)	*/
export class DeviceRoadStatistic implements IModel {
  /**	String	道路ID 	M	*/
  RoadId!: string;
  /**	String	道路名称	M	*/
  RoadName!: string;
  /**	Double	总时长，单位：秒	M	*/
  TotalSeconds!: number;
  /**	Double	总里程，单位：米	M	*/
  TotalMeters!: number;
  /**	DateTime	最早出现时间	M	*/
  @Transform(Transformer.DateTime)
  BeginTime!: Date;
  /**	DateTime	最后出现时间	M	*/
  @Transform(Transformer.DateTime)
  EndTime!: Date;
  /**	Double	平均时速，单位：km/h	M	*/
  AvgSpeed!: number;
  /**	Double	最高时速，单位：km/h	M	*/
  FastestSpeed!: number;
}
