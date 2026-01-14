import { Transform, Type } from 'class-transformer';
import { IIdModel, ILocation } from '../../model.interface';
import { Transformer } from '../../transformer';
import { Assignment } from '../event/assignment.model';
import { EventResourceContent } from '../event/event-resource-content.model';
import { GisPoints } from '../gis-point.model';

/**	RoadObjectEventRecord (道路物件事件记录)	*/
export class RoadObjectEventRecord implements IIdModel, ILocation {
  /**	String	事件ID	M	*/
  Id!: string;
  /**	String	设备ID，设备序列号，非实时事件，序列号无效。	M	*/
  DeviceId!: string;
  /**	DateTime	事件时间	M	*/
  @Transform(Transformer.DateTime)
  EventTime!: Date;
  /**	Int32	事件类型	M	*/
  EventType!: number;
  /**	Int32	事件触发类型	M	*/
  TriggerType!: number;
  /**	DateTime	开始时间	O	*/
  @Transform(Transformer.DateTime)
  BeginTime?: Date;
  /**	DateTime	结束时间	O	*/
  @Transform(Transformer.DateTime)
  EndTime?: Date;
  /**	String	描述内容	O	*/
  Description?: string;
  /**	BASE64	扩展数据	O	*/
  @Transform(Transformer.Base64)
  ExtensionData?: string;
  /**	EventResourceContent[]	报警事件资源列表	O	*/
  @Type(() => EventResourceContent)
  Resources?: EventResourceContent[];
  /**	Assignment	派单和处置信息	O	*/
  @Type(() => Assignment)
  Assignment?: Assignment;
  /**	GisPoint	Gis坐标	O	*/
  @Type(() => GisPoints)
  Location?: GisPoints;
  /**	String	事件配对ID	O	*/
  Guid?: string;
  /**	String	分组GUID，用于中心服务器区分来源	O	*/
  GroupGuid?: string;
  /**	String	分组名称	O	*/
  GroupName?: string;
  /**	String	区划ID	O	*/
  DivisionId?: string;
  /**	String	地址	O	*/
  Address?: string;
  /**	Boolean	是否已确认	O	*/
  Confirmed?: boolean;
  /**	DateTime	确认时间	O	*/
  @Transform(Transformer.DateTime)
  ConfirmedTime?: Date;
  /**	Double	置信度，0-100	O	*/
  Confidence?: number;
  /**	String	网格ID	O	*/
  GridCellId?: string;
  /**	String	物件ID	M	*/
  RoadObjectId!: string;
  /**	String	物件名称	M	*/
  RoadObjectName!: string;
  /**	Int32	物件类型	M	*/
  RoadObjectType!: number;
  /**	Int32	物件分类，用于分辨不同层级和重要度的物件	O	*/
  Category?: number;
  /**	Double	健康度0-100	O	*/
  Health?: number;
}
