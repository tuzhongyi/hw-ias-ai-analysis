/**	EventResourceContent (AI事件资源内容)	*/

import { Type } from 'class-transformer';
import 'reflect-metadata';
import { IModel } from '../../model.interface';
import { GisPoint } from '../gis-point.model';
import { EventDataObject } from './event-data-object.model';

export class EventResourceContent implements IModel {
  /**	String	资源ID	M	*/
  ResourceId!: string;
  /**	Int32	资源类型：Camera	M	*/
  ResourceType!: number;
  /**	String	资源名称	M	*/
  ResourceName!: string;
  /**	Int32	摄像机机位	O	*/
  PositionNo?: number;
  /**	Int64	数值	O	*/
  Value?: number;
  /**	String	图片地址	O	*/
  ImageUrl?: string;
  /**	String	录像地址	O	*/
  RecordUrl?: string;
  /**	EventDataObject[]	目标	O	*/
  @Type(() => EventDataObject)
  Objects?: EventDataObject[];
  /**	GisPoint	Gis坐标	O */
  @Type(() => GisPoint)
  Location?: GisPoint;
}
