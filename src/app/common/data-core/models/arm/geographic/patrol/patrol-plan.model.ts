import { Transform, Type } from 'class-transformer';
import { IIdNameModel } from '../../../interface/model.interface';
import { Transformer } from '../../../transformer';
import { WeekTimeSegment } from '../../analysis/segment/week-time-segment.model';
import { PatrolPlanSection } from './patrol-plan-section.model';

/**	PatrolPlan (巡逻计划)	*/
export class PatrolPlan implements IIdNameModel {
  /**	String	计划ID	M	*/
  Id!: string;
  /**	String	计划名称	M	*/
  Name!: string;
  /**	Int32	巡逻计划类型	M	*/
  PlanType!: number;
  /**	String[]	配对的设备列表	M	*/
  MobileDeviceIds!: string[];
  /**	DateTime	创建时间	M	*/
  @Transform(Transformer.DateTime)
  CreationTime!: Date;
  /**	DateTime	更新时间	M	*/
  @Transform(Transformer.DateTime)
  UpdateTime!: Date;
  /**	Boolean	是否启用工作表，暂时不启用	O	*/
  ScheduleEnabled?: boolean;
  /**	WeekTimeSegment	工作表	O	*/
  @Type(() => WeekTimeSegment)
  Schedule?: WeekTimeSegment;
  /**	PatrolPlanSection[]	巡逻路段集合	O	*/
  @Type(() => PatrolPlanSection)
  PatrolSections?: PatrolPlanSection[];
  /**	String	分组GUID，用于中心服务器区分来源	O	*/
  GroupGuid?: string;
  /**	String	分组名称	O	*/
  GroupName?: string;
  /**	String[]	所属分组列表	O	*/
  GroupGuids?: string[];
  /**	String	描述信息	O	*/
  Description?: string;
  /**	Double	总距离，单位：米，只读会根据GeoLine自动计算。	O	*/
  TotalDistance?: number;
  /**	String	区划ID	O	*/
  DivisionId?: string;
}
