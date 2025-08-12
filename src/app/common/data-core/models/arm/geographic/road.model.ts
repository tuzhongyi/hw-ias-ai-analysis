import { Transform, Type } from 'class-transformer';
import 'reflect-metadata';
import { IIdNameModel } from '../../model.interface';
import { Transformer } from '../../transformer';
import { GisPoint } from '../gis-point.model';

/**	Road (道路信息)	*/
export class Road implements IIdNameModel {
  /**	String	道路ID	M	*/
  Id!: string;
  /**	String	道路名称	M	*/
  Name!: string;
  /**	Int32	用户分组ID	O	*/
  GroupId?: number;
  /**	Int32	分类，保留	O	*/
  Classification?: number;
  /**	String	描述	O	*/
  Description?: string;
  /**	GisPoint[]	GPS坐标	O	*/
  @Type(() => GisPoint)
  GeoLine?: GisPoint[];
  /**	DateTime	创建时间	M */
  @Transform(Transformer.DateTime)
  CreationTime!: Date;
  /**	DateTime	更新时间	M */
  @Transform(Transformer.DateTime)
  UpdateTime!: Date;

  /**	String	省、直辖市	O */
  State?: string;
  /**	String	市、区	O */
  City?: string;
  /**	String	镇，县	O */
  Town?: string;
  /**	String	国家	O */
  County?: string;
  /**	String	国家编码	O */
  CountyCode?: string;
  /**	String	分组GUID，用于中心服务器区分来源	O */
  GroupGuid?: string;
  /**	String	分组名称	O */
  GroupName?: string;
}
