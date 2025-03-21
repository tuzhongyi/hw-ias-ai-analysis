import { IModel } from '../model.interface';

/**	Point (点)	*/
export class HowellPoint implements IModel {
  /**	Double	X轴坐标，归一化数值	M	*/
  X!: number;
  /**	Double	Y轴坐标，归一化数值	M	*/
  Y!: number;

  static equals(a: HowellPoint, b: HowellPoint) {
    return a.X === b.X && a.Y === b.Y;
  }
  static create() {
    let point = new HowellPoint();
    point.X = 0;
    point.Y = 0;
    return point;
  }
}
