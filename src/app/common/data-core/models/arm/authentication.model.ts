import { AuthType } from '../../enums/auth-type.enum'
import { IModel } from '../model.interface'

/**	Authentication (进程信息)	*/
export class Authentication implements IModel {
  /**
   * String	认证方式。
   * Digest：摘要认证
   * Basic：基础认证
   * M
   **/
  AuthType!: AuthType
  /**	String	算法。(保留)	O	*/
  Algorithm?: string
}
