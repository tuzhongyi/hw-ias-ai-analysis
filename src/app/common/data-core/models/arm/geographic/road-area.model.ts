import { Transform, Type } from 'class-transformer';
import { IIdNameModel } from '../../interface/model.interface';
import { Transformer } from '../../transformer';
import { WeekTimeSegment } from '../analysis/segment/week-time-segment.model';
import { GisPoint } from '../gis-point.model';

/**	RoadArea (道路区域)	*/
export class RoadArea implements IIdNameModel {
  /**	String	路段ID	M	R */
  Id!: string;
  /**	String	路段名称	M	RW */
  Name!: string;
  /**	Int32	用途	M	RW */
  UsageType!: number;
  /**	Int32[]	事件类型	O	RW */
  EventTypes?: number[];
  /**	GisPoint[]	区域的GPS坐标，区域最后一个点会与第一个点做闭合多边形。	O	RW */
  @Type(() => GisPoint)
  Area?: GisPoint[];
  /**	DateTime	创建时间	M	RW */
  @Transform(Transformer.DateTime)
  CreationTime!: Date;
  /**	DateTime	更新时间	M	RW */
  @Transform(Transformer.DateTime)
  UpdateTime!: Date;
  /**	Boolean	是否启用工作表	O	RW */
  ScheduleEnabled?: boolean;
  /**	WeekTimeSegment	工作表	O	RW */
  @Type(() => WeekTimeSegment)
  Schedule?: WeekTimeSegment;
  /**	Int32	用户分组ID	O	RW */
  GroupId?: number;
  /**	String	分组GUID，用于中心服务器区分来源	O	RW */
  GroupGuid?: string;
  /**	String	分组名称	O	RW */
  GroupName?: string;
  /**	String[]	所属分组列表	O	RW */
  GroupGuids?: string[];
  /**	String	描述信息	O	RW */
  Description?: string;
}
