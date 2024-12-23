import { IModel } from '../model.interface'

/**	Point (点)	*/
export class Point implements IModel {
  /**	Double	X轴坐标，归一化数值	M	*/
  X!: number
  /**	Double	Y轴坐标，归一化数值	M	*/
  Y!: number

  static equals(a: Point, b: Point) {
    return a.X === b.X && a.Y === b.Y
  }
}
