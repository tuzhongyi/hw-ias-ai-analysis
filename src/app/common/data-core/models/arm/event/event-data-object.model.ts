/**	EventDataObject (事件目标)	*/
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { IIdModel } from '../../model.interface';
import { HowellPoint } from '../point.model';

export class EventDataObject implements IIdModel {
  /**	String	目标ID	M	*/
  Id!: string;
  /**	Point[]	目标所在的归一化多边形	M	*/
  @Type(() => HowellPoint)
  Polygon!: HowellPoint[];
  /**	Double	置信度：0-100	M	*/
  Confidence!: number;
  /**	String	招牌名称	O */
  Description?: string;
}
