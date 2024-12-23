import { Transform } from 'class-transformer'
import { Time } from '../../common/time.model'
import { IModel } from '../../model.interface'
import { transformDateTime, transformTime } from '../../transformer'

/**	FileGpsItem (文件中的GPS信息)	*/
export class FileGpsItem implements IModel {
  /**	Int64	坐标序号，从1开始	M	*/
  No!: number
  /**	Double	经度	M	*/
  Longitude!: number
  /**	Double	纬度	M	*/
  Latitude!: number
  /**	DateTime	绝对时间	O	*/
  @Transform(transformDateTime)
  OSDTime?: Date
  /**	Time	相对时间	M	*/
  @Transform(transformTime)
  OffsetTime!: Time
}
