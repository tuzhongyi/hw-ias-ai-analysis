import { Transform, Type } from 'class-transformer';
import { IIdNameModel } from '../../model.interface';
import { Transformer } from '../../transformer';
import { WeekTimeSegment } from '../analysis/segment/week-time-segment.model';
import { GisPoint } from '../gis-point.model';

/**	RoadSection (路段)	*/
export class RoadSection implements IIdNameModel {
  /**	String	路段ID	M	*/
  Id!: string;
  /**	String	路段名称	M	*/
  Name!: string;
  /**	Int32	路段类型	M	*/
  SectionType!: number;
  /**	Int32[]	事件类型	O	*/
  EventTypes?: number[];
  /**	Double	屏蔽半径范围，单位：米，0-100米	O	*/
  Raduis?: number;
  /**	GisPoint[]	GPS坐标，根据方向优先经过的位置在数组最前面，下标最小。	O	*/
  @Type(() => GisPoint)
  GeoLine?: GisPoint[];
  /**	DateTime	创建时间	M	*/
  @Transform(Transformer.DateTime)
  CreationTime!: Date;
  /**	DateTime	更新时间	M	*/
  @Transform(Transformer.DateTime)
  UpdateTime!: Date;
  /**	Boolean	是否启用工作表	O	*/
  ScheduleEnabled?: boolean;
  /**	WeekTimeSegment	工作表	O	*/
  @Type(() => WeekTimeSegment)
  Schedule?: WeekTimeSegment;
  /**	Int32	用户分组ID	O	*/
  GroupId?: number;
  /**	String	分组GUID，用于中心服务器区分来源	O	*/
  GroupGuid?: string;
  /**	String	分组名称	O	*/
  GroupName?: string;
  /**	String[]	所属分组列表	O	*/
  GroupGuids?: string[];
  /**	String	描述信息	O	*/
  Description?: string;
}
