import { Transform } from 'class-transformer';
import { IIdNameModel } from '../../interface/model.interface';
import { Transformer } from '../../transformer';
import { WeekTimeSegment } from '../analysis/segment/week-time-segment.model';
import { GisPoints } from '../gis-point.model';

/**	RoadPoint (道路屏蔽点)	*/
export class RoadPoint implements IIdNameModel {
  /**	String	路段ID	M	*/
  Id!: string;
  /**	String	路段名称	M	*/
  Name!: string;
  /**	Int32	路段类型	M	*/
  PointType!: number;
  /**	Int32[]	事件类型	O	*/
  EventTypes?: number[];
  /**	Int32[]	道路部件类型	O	*/
  RoadObjectTypes?: number[];
  /**	Double	屏蔽半径范围，单位：米，5-100米	O	*/
  Raduis?: number;
  /**	GisPoint	GPS坐标	O	*/
  @Transform(Transformer.GisPoint)
  Location?: GisPoints;
  /**	DateTime	创建时间	M	*/
  @Transform(Transformer.DateTime)
  CreationTime!: Date;
  /**	DateTime	更新时间	M	*/
  @Transform(Transformer.DateTime)
  UpdateTime!: Date;
  /**	DateTime	过期时间	M	*/
  @Transform(Transformer.DateTime)
  ExpiredTime!: Date;
  /**	Boolean	是否启用工作表	M	*/
  ScheduleEnabled!: boolean;
  /**	WeekTimeSegment	工作表	O	*/
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
