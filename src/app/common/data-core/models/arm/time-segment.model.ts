import { Transform } from 'class-transformer'
import { Time } from '../common/time.model'
import { IModel } from '../model.interface'
import { transformTime } from '../transformer'

/**	TimeSegment (时间段)	*/
export class TimeSegment implements IModel {
  /**	Time	开始时间，00:00:00-23:59:59	M	*/
  @Transform(transformTime)
  StartTime!: Time
  /**	Time	结束时间，00:00:00-23:59:59	M	*/
  @Transform(transformTime)
  StopTime!: Time
}
