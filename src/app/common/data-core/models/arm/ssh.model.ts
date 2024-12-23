import { IModel } from '../model.interface'

/**	SSH (SSH配置参数)	*/
export class SSH implements IModel {
  /**	Boolean	SSH开关。
false：关闭，true：开启	M	*/
  Enabled!: boolean
}
