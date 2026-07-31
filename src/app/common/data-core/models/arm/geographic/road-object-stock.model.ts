import { Transform, Type } from 'class-transformer';
import { RoadObjectType } from '../../../enums/road/road-object/road-object-type.enum';
import { IIdNameModel, ILocation } from '../../interface/model.interface';
import { Transformer } from '../../transformer';
import { GisPoint, GisPoints } from '../gis-point.model';

/**	RoadObjectStock (道路部件待入数据)	*/
export class RoadObjectStock
  implements IIdNameModel<string | undefined>, ILocation
{
  /**	String	数据ID	O	*/
  Id: string | undefined;
  /**	String	部件名称	M	*/
  Name!: string;
  /**	Int32	部件类型	O	*/
  ObjectType?: RoadObjectType;
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
  /**	DateTime	创建时间	O	*/
  @Transform(Transformer.DateTime)
  CreationTime?: Date;
  /**	DateTime	更新时间	O	*/
  @Transform(Transformer.DateTime)
  UpdateTime?: Date;
  /**	Int32	部件分类，用于分辨不同层级和重要度的部件	O	*/
  Category?: number;
  /**	String	部件照片	O	*/
  ImageUrl?: string;
  /**	Boolean	是否为线段坐标，默认：false	O	*/
  IsGeoLine?: boolean;
  /**	GisPoint[]	GPS线段坐标，目前只有部件类型为：机非隔离栏的会使用。线段模式的部件，采样方式只能支持2：固定间隔的采样。	O	*/
  @Type(() => GisPoint)
  GeoLine?: GisPoint[];
}
