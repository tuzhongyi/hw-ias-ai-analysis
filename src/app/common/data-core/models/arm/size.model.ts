import { IModel } from '../model.interface'

/**	Size (目标大小)	*/
export class Size implements IModel {
  /**	Double	宽度，归一化数值	M	*/
  Width!: number
  /**	Double	高度，归一化数值	M	*/
  Height!: number
}
