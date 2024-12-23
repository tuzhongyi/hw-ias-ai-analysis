import { Transform, Type } from 'class-transformer'
import 'reflect-metadata'
import { IIdNameModel } from '../../model.interface'
import { transformDateTime, transformRound } from '../../transformer'
import { GisPoint } from '../gis-point.model'

/**	Shop (商铺信息)	*/
export class Shop implements IIdNameModel {
  /**	String	商铺ID	M	*/
  Id!: string
  /**	Int64	整数ID	M	*/
  IntId!: number
  /**	String	商铺名称	M	*/
  Name!: string
  /**	String[]	候选名称	O	*/
  Texts?: string[]
  /**	String	分店名称	O	*/
  BranchName?: string
  /**	String	地址	O	*/
  Address?: string
  /**	Int32	商铺对象状态	M	*/
  ObjectState!: number
  /**	String	联系方式	O	*/
  Telphone?: string
  /**	Double	置信度，0-1	O	*/
  @Transform((value) => transformRound(value, 4))
  Confidence?: number
  /**	GisPoint	商铺Gis坐标	O	*/
  @Type(() => GisPoint)
  Location?: GisPoint
  /**	String	商铺照片	O	*/
  ImageUrl?: string
  /**	DateTime	第一次出现的时间	M	*/
  @Transform(transformDateTime)
  BeginTime!: Date
  /**	DateTime	最后一次出现的时间	M	*/
  @Transform(transformDateTime)
  EndTime!: Date
  /**	DateTime	创建时间	M	*/
  @Transform(transformDateTime)
  CreationTime!: Date
  /**	DateTime	更新时间	M	*/
  @Transform(transformDateTime)
  UpdateTime!: Date
  /**	Boolean	是否手动标注的，锁定内容	O	*/
  Locked?: boolean
  /**	Boolean	屏蔽数据，true：屏蔽	O	*/
  Marking?: boolean
  /**	Double	加权值	O	*/
  WeightedValue?: number
  /**	Int32	性质，保留	O	*/
  Nature?: number
  /**	Int32	分类，保留	O	*/
  Classification?: number
  /**	Int32	用户分组ID	O	*/
  GroupId?: number
}
