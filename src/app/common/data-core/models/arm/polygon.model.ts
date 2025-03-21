import { Type } from 'class-transformer';
import 'reflect-metadata';
import { IModel } from '../model.interface';
import { HowellPoint } from './point.model';

/**	Polygon (多边形)	*/
export class Polygon implements IModel {
  /**	Point[]	多边形坐标顶点，归一化数值	M	*/
  @Type(() => HowellPoint)
  Coordinates!: HowellPoint[];
}
