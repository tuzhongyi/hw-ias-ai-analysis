import { IIdNameLocationModel } from '../../interface/model.interface';
import { GisPoint, GisPoints } from '../gis-point.model';

/** RoadObject 与 RoadObjectStock 的公共属性 */
export interface IRoadObject<T = string> extends IIdNameLocationModel<T> {
  /**	String	数据ID	*/
  Id: T;
  /**	String	部件名称	*/
  Name: string;
  /**	Int32	部件类型	*/
  ObjectType?: number;
  /**	String	描述信息	*/
  Description?: string;
  /**	GisPoint	Gis坐标	*/
  Location: GisPoints;
  /**	String	部件所在地址	*/
  Address?: string;
  /**	String	分组GUID，用于中心服务器区分来源	*/
  GroupGuid?: string;
  /**	String	分组名称	*/
  GroupName?: string;
  /**	String[]	所属分组列表	*/
  GroupGuids?: string[];
  /**	String	区划ID	*/
  DivisionId?: string;
  /**	String	网格ID	*/
  GridCellId?: string;
  /**	DateTime	创建时间	*/
  CreationTime?: Date;
  /**	DateTime	更新时间	*/
  UpdateTime?: Date;
  /**	Int32	部件分类，用于分辨不同层级和重要度的部件	*/
  Category?: number;
  /**	String	部件照片	*/
  ImageUrl?: string;
  /**	Boolean	是否为线段坐标，默认：false	*/
  IsGeoLine?: boolean;
  /**	GisPoint[]	GPS线段坐标	*/
  GeoLine?: GisPoint[];
}
