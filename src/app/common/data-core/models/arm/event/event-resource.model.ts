import { Transform, Type } from 'class-transformer';
import 'reflect-metadata';
import { IModel } from '../../model.interface';
import { Transformer } from '../../transformer';
import { GisPoints } from '../gis-point.model';
import { EventDataObject } from './event-data-object.model';

/**	EventResource (事件资源)	*/
export class EventResource implements IModel {
  /**	String	资源ID	M	*/
  ResourceId!: string;
  /**	Int32	资源类型	M	*/
  ResourceType!: number;
  /**	String	资源名称	M	*/
  ResourceName!: string;
  /**	Int32	摄像机机位	O	*/
  PositionNo?: number;
  /**	EventDataObject[]	目标	O	*/
  @Type(() => EventDataObject)
  Objects?: EventDataObject[];
  /**	Int32	数值	O 	*/
  Value?: number;
  /**	String	图片名称，对应摄像机名称	O	*/
  PictureId?: string;
  /**	GisPoint	Gis坐标	O	*/
  @Transform(Transformer.GisPoint)
  Location?: GisPoints;
}
