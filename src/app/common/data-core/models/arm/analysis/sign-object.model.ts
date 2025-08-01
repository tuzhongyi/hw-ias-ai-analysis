import { Transform, Type } from 'class-transformer';
import 'reflect-metadata';
import { IModel } from '../../model.interface';
import { transformDateTime } from '../../transformer';
import { GisPoints, transformGisPoint } from '../gis-point.model';
import { HowellPoint } from '../point.model';

/**	SignObject (店招对象)	*/
export class SignObject implements IModel {
  /**	DateTime	发现时间	M	*/
  @Transform(transformDateTime)
  Time!: Date;
  /**	String	图片地址	O	*/
  ImageUrl?: string;
  /**	String	招牌名称	M	*/
  Text!: string;
  /**	Double	置信度，0-1	O	*/
  Confidence?: number;
  /**	Point[]	招牌多边形在图片上的归一化坐标	O	*/
  @Type(() => HowellPoint)
  Polygon?: HowellPoint[];
  /**	GisPoint	照片Gis坐标	O	*/
  @Transform(transformGisPoint)
  Location?: GisPoints;
}
