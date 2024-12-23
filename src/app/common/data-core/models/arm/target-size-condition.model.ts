import { IModel } from '../model.interface'
import { Size } from './size.model'

/**	TargetSizeCondition (目标大小过滤条件)	*/
export class TargetSizeCondition implements IModel {
  /**	Boolean	是否启用条件	M	*/
  Enabled!: boolean
  /**	Size	最小目标大小	O	*/
  Min?: Size
  /**	Size	最大目标大小	O	*/
  Max?: Size
}
