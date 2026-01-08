import { Transform } from 'class-transformer';
import { IIdNameModel, ILocation } from '../../model.interface';
import { Transformer } from '../../transformer';
import { GisPoints } from '../gis-point.model';

/**	RoadObject (道路固件)	*/
export class RoadObject implements IIdNameModel, ILocation {
  /**	String	物件ID	M	*/
  Id!: string;
  /**	String	物件名称	M	*/
  Name!: string;
  /**	Int32	物件类型	M	*/
  ObjectType!: number;
  /**	String	描述信息	O	*/
  Description?: string;
  /**	GisPoint	Gis坐标	M	*/
  @Transform(Transformer.GisPoint)
  Location!: GisPoints;
  /**	String	物件所在地址	O	*/
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
}
