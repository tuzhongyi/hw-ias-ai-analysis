import { Transform } from 'class-transformer'
import { IModel } from '../model.interface'
import { transformRound } from '../transformer'

/**	UpgradeStatus (程序升级状态和进度)	*/
export class UpgradeStatus implements IModel {
  /**	Int32	是否正在升级	M	*/
  Upgrading!: number
  /**	Int32	进度0-100，100表示完成。	M	*/
  @Transform((value) => transformRound(value, 2))
  Progress!: number
  /**	Int32	错误编号，0-成功，其他待定。	M	*/
  Error!: number
}
