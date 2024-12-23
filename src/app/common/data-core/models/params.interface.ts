import { Transform } from 'class-transformer'
import { transformDateTime } from './transformer'

export interface IParams {}
export class PagedParams implements IParams {
  /**页码[1-n](可选) */
  PageIndex: number = 1
  /**分页大小[1-100](可选) */
  PageSize: number = 1000
}

export class PagedDurationParams extends PagedParams {
  /**	DateTime	开始时间	M */
  @Transform(transformDateTime)
  BeginTime!: Date
  /**	DateTime	结束时间	M */
  @Transform(transformDateTime)
  EndTime!: Date
}
