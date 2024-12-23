import { IModel } from '../model.interface'

/**	TargetCondition (目标过滤条件)	*/
export class TargetCondition implements IModel {
  /**	Int32	持续时间，0-1800，0的话表示立即触发事件	M	*/
  Duration!: number
  /**	Int32	目标置信度，0-100	M	*/
  Confidence!: number
  /**	Int32	判断间隔(单位：秒)，默认：1秒	O	*/
  CheckInterval?: number
}
