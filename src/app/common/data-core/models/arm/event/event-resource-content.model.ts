/**	EventResourceContent (AI事件资源内容)	*/

import { Transform, Type } from 'class-transformer';
import 'reflect-metadata';
import { IModel } from '../../model.interface';
import { GisPoints, transformGisPoint } from '../gis-point.model';
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
  /**
   * String
   * 关联的资源ID，
   * 如：资源类型为Shop时，如果有关联的注册商铺此处为注册商铺ID
   * O
   **/
  RelationId?: string;

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
  @Transform(transformGisPoint)
  Location?: GisPoints;
}
