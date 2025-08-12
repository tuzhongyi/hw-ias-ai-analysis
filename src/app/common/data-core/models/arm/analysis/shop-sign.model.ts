/**	ShopSign (商铺招牌信息)	*/

import { Transform } from 'class-transformer';
import 'reflect-metadata';
import { IIdModel } from '../../model.interface';
import { Transformer } from '../../transformer';
import { GisPoints } from '../gis-point.model';
import { HowellPoint } from '../point.model';

export class ShopSign implements IIdModel {
  /**	String	商铺招牌ID	M	*/
  Id!: string;
  /**	Int64	商铺招牌ID	M	*/
  IntId!: number;
  /**	String	任务ID	O	*/
  TaskId?: string;
  /**	String	招牌名称	O	*/
  Text?: string;
  /**	Double	置信度，0-1	O	*/

  Confidence?: number;
  /**	DateTime	发现时间	M	*/
  @Transform(Transformer.DateTime)
  Time!: Date;
  /**	String	图片地址	O	*/
  ImageUrl?: string;
  /**	Point[]	招牌多边形在图片上的归一化坐标	O	*/
  Polygon?: HowellPoint[];
  /**	GisPoint	照片Gis坐标	O	*/
  @Transform(Transformer.GisPoint)
  Location?: GisPoints;
  /**	Int32	用户分组ID	O	*/
  GroupId?: number;
  /**	Int32	状态，保留	O	*/
  ObjectState?: number;
  /**	String	商铺ID	O */
  ShopId?: string;
  /**	Int32	结果标注类型	O */
  ResultLabelType?: number;
  /**	String	机位编号	O */
  CameraNo?: string;
  /**	Int32	招牌类型，1：商铺招牌，	O */
  SignType?: number;
}
