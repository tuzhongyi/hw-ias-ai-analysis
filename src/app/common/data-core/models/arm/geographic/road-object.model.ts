import { Transform, Type } from 'class-transformer';
import { IIdNameModel, ILocation } from '../../interface/model.interface';
import { Transformer } from '../../transformer';
import { WeekTimeSegment } from '../analysis/segment/week-time-segment.model';
import { GisPoint, GisPoints } from '../gis-point.model';
import { ObjectImageSamplingConfig } from './object-image-sampling-config.model';

/**	RoadObject (道路固件)	*/
export class RoadObject implements IIdNameModel, ILocation {
  /**	String	部件ID	M	*/
  Id!: string;
  /**	String	部件名称	M	*/
  Name!: string;
  /**	Int32	部件类型	M	*/
  ObjectType!: number;
  /**	String	描述信息	O	*/
  Description?: string;
  /**	GisPoint	Gis坐标	M	*/
  @Transform(Transformer.GisPoint)
  Location!: GisPoints;
  /**	String	部件所在地址	O	*/
  Address?: string;
  /**	String	分组GUID，用于中心服务器区分来源	O	*/
  GroupGuid?: string;
  /**	String	分组名称	O	*/
  GroupName?: string;
  /**	String[]	所属分组列表	O	*/
  GroupGuids?: string[];
  /**	String	区划ID	O	*/
  DivisionId?: string;
  /**	String	网格ID	O	*/
  GridCellId?: string;
  /**	DateTime	创建时间	M	*/
  @Transform(Transformer.DateTime)
  CreationTime!: Date;
  /**	DateTime	更新时间	M	*/
  @Transform(Transformer.DateTime)
  UpdateTime!: Date;
  /**	Int32	部件分类，用于分辨不同层级和重要度的部件	O	*/
  Category?: number;
  /**	Double	健康度0-100	O	*/
  Health?: number;
  /**	String	部件照片	O	*/
  ImageUrl?: string;
  /**	Int32	连续消失次数	M	*/
  DisappearTimes!: number;
  /**	ObjectImageSamplingConfig	图片采样计划	M	*/
  @Type(() => ObjectImageSamplingConfig)
  ImageSampling!: ObjectImageSamplingConfig;
  /**	Int32	部件状态	M	*/
  ObjectState!: number;

  /**	Boolean	禁用	O	RW */
  Disable?: boolean;
  /**	Boolean	是否启用屏蔽工作表，默认False	O	RW */
  BlockScheduleEnabled?: boolean;
  /**	WeekTimeSegment	屏蔽工作表，默认：不启动	O	RW */
  BlockSchedule?: WeekTimeSegment;
  /**	Boolean	是否为线段坐标，默认：false	O	RW */
  IsGeoLine?: boolean;
  /**	GisPoint[]	GPS线段坐标，目前只有部件类型为：机非隔离栏的会使用。	O	RW */
  @Type(() => GisPoint)
  GeoLine?: GisPoint[];
}
