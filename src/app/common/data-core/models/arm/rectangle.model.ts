import { IModel } from '../model.interface'

/**	Rectangle (矩形)	*/
export class Rectangle implements IModel {
  /**	Double	左X轴坐标，归一化数值	M	*/
  Left!: number
  /**	Double	上Y轴坐标，归一化数值	M	*/
  Top!: number
  /**	Double	宽度，归一化数值	M	*/
  Width!: number
  /**	Double	高度，归一化数值	M	*/
  Height!: number
}
