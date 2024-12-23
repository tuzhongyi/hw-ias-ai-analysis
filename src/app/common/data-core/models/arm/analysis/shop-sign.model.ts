/**	ShopSign (商铺招牌信息)	*/

import { Transform, Type } from 'class-transformer'
import 'reflect-metadata'
import { IIdModel } from '../../model.interface'
import { transformDateTime, transformRound } from '../../transformer'
import { GisPoint } from '../gis-point.model'
import { Point } from '../point.model'

export class ShopSign implements IIdModel {
  /**	String	商铺招牌ID	M	*/
  Id!: string
  /**	Int64	商铺招牌ID	M	*/
  IntId!: number
  /**	String	任务ID	O	*/
  TaskId?: string
  /**	String	招牌名称	O	*/
  Text?: string
  /**	Double	置信度，0-1	O	*/
  @Transform((value) => transformRound(value, 4))
  Confidence?: number
  /**	DateTime	发现时间	M	*/
  @Transform(transformDateTime)
  Time!: Date
  /**	String	图片地址	O	*/
  ImageUrl?: string
  /**	Point[]	招牌多边形在图片上的归一化坐标	O	*/
  Polygon?: Point[]
  /**	GisPoint	照片Gis坐标	O	*/
  @Type(() => GisPoint)
  Location?: GisPoint
  /**	Int32	用户分组ID	O	*/
  GroupId?: number
  /**	Int32	状态，保留	O	*/
  ObjectState?: number

  ShopId?: string
}
