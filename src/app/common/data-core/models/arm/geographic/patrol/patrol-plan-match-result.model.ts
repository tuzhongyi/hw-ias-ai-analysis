import { Transform, Type } from 'class-transformer';
import { IModel } from '../../../interface/model.interface';
import { Transformer } from '../../../transformer';
import { PatrolSectionMatchResult } from './patrol-section-match-result.model';

/**	PatrolPlanMatchResult (巡逻计划比配结果)	*/
export class PatrolPlanMatchResult implements IModel {
  /**	String	巡逻计划ID	M	*/
  PatrolPlanId!: string;
  /**	String	巡逻计划名称	O	*/
  PatrolPlanName?: string;
  /**	String	巡逻设备ID	M	*/
  MobileDeviceId!: string;
  /**	String	巡逻设备名称	O	*/
  MobileDeviceName?: string;
  /**	DateTime	开始时间	M	*/
  @Transform(Transformer.DateTime) BeginTime!: Date;
  /**	DateTime	结束时间	M	*/
  @Transform(Transformer.DateTime) EndTime!: Date;
  /**	Double	行驶时长，单位：秒	O	*/
  MovingSeconds?: number;
  /**	Double	停留时长，单位：秒	O	*/
  StaySeconds?: number;
  /**	Double	总里程，单位：米	O	*/
  TotalMeters?: number;
  /**	Double	平均时速，单位：km/h	O	*/
  AvgSpeed?: number;
  /**	Double	最高时速，单位：km/h	O	*/
  FastestSpeed?: number;
  /**	Int32	每日应行驶总里程，单位：米	O	*/
  DailyMeters?: number;
  /**	Double	行驶覆盖率，0-100	O	*/
  CoveragePercent?: number;
  /**	PatrolSectionMatchResult[]	匹配路段列表	O	*/
  @Type(() => PatrolSectionMatchResult)
  PatrolSections?: PatrolSectionMatchResult[];
}
