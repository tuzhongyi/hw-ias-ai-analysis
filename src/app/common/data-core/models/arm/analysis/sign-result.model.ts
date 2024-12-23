import { Type } from 'class-transformer'
import 'reflect-metadata'
import { IModel } from '../../model.interface'
import { SignObject } from './sign-object.model'

/**	SignResult (店招分析结果)	*/
export class SignResult implements IModel {
  /**	Int32	匹配结果：0-匹配成功, 1-以前没发现的新店招, 2-消失的旧店招	M	*/
  Result!: number
  /**	Double	置信度，0-1	O	*/
  Confidence?: number
  /**	SignObject[]	招牌信息	O	*/
  @Type(() => SignObject)
  Signs?: SignObject[]
}
