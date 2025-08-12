import { Transform, Type } from 'class-transformer';
import 'reflect-metadata';
import { IIdModel } from '../../model.interface';
import { Transformer } from '../../transformer';
import { GisPoints } from '../gis-point.model';
import { EventResource } from './event-resource.model';

/**	EventUploadContent (AI事件上传内容)	*/
export class EventUploadContent implements IIdModel {
  /**	String	事件ID	M	*/
  Id!: string;
  /**	DateTime	事件时间	M	*/
  @Transform(Transformer.DateTime) EventTime!: Date;
  /**	Int32	事件类型	M	*/
  EventType!: number;
  /**	Int32	事件触发类型	M	*/
  TriggerType!: number;
  /**	DateTime	开始时间	O	*/
  @Transform(Transformer.DateTime) BeginTime?: Date;
  /**	DateTime	结束时间	O	*/
  @Transform(Transformer.DateTime) EndTime?: Date;
  /**	EventResource[]	报警事件资源列表	O	*/
  @Type(() => EventResource)
  Resources?: EventResource[];
  /**	BASE64	扩展数据	O	*/
  @Transform(Transformer.Base64)
  ExtensionData?: string;
  /**	GisPoint	Gis坐标	O	*/

  @Type(() => GisPoints)
  Location?: GisPoints;
  /**	String	事件配对ID	O	*/
  Guid?: string;
}
