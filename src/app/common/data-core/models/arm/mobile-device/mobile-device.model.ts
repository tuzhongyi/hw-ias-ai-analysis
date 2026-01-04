import { Transform } from 'class-transformer';
import { IIdNameLocationModel } from '../../model.interface';
import { Transformer } from '../../transformer';
import { GisPoints } from '../gis-point.model';

/**	MobileDevice (移动设备信息)	*/
export class MobileDevice implements IIdNameLocationModel {
  /**	String	设备唯一标识符	M	*/
  Id!: string;
  /**	String	设备名称	M	*/
  Name!: string;
  /**	String	设备序列号	M	*/
  SerialNumber!: string;
  /**	Int32	设备类型，1：巡逻车辆	M	*/
  DeviceType!: number;
  /**	String	描述信息	O	*/
  Description?: string;
  /**	GisPoint	当前Gis坐标	O	*/
  @Transform(Transformer.GisPoint)
  Location?: GisPoints;
  /**	Int32	在线状态，0：在线，1：离线	O	*/
  OnlineStatus?: number;
  /**	DateTime	最后在线时间	O	*/
  @Transform(Transformer.DateTime)
  LastOnlineTime?: Date;
  /**	DateTime	创建时间	O	*/
  @Transform(Transformer.DateTime)
  CreationTime?: Date;
  /**	DateTime	更新时间	O	*/
  @Transform(Transformer.DateTime)
  UpdateTime?: Date;
  /**	Int32	用户分组ID	O	*/
  GroupId?: number;
  /**	String	接入Token数值	O	*/
  AccessToken?: string;
  /**	DateTime	接入Token创建时间	O	*/
  @Transform(Transformer.DateTime)
  AccessTokenTime?: Date;
  /**	String	分组GUID，用于中心服务器区分来源	O	*/
  GroupGuid?: string;
  /**	String	分组名称	O	*/
  GroupName?: string;
  /**	String	区划ID，（街道、网格）	O */
  DivisionId?: string;
  /**	String	网格ID	O */
  GridCellId?: string;
  /**	Int32	每日应行驶里程数，单位：米	O */
  DailyMeters?: number;
}
