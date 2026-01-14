import { Transform, Type } from 'class-transformer';
import { IIdModel, ILocation } from '../../model.interface';
import { Transformer } from '../../transformer';
import { EventResource } from '../event/event-resource.model';
import { GisPoints } from '../gis-point.model';

/**	RoadObjectEventUploadContent (道路固件事件上传内容)	*/
export class RoadObjectEventUploadContent implements IIdModel, ILocation {
  /**	String	事件ID	M	*/
  Id!: string;
  /**	DateTime	事件时间	M	*/
  @Transform(Transformer.DateTime)
  EventTime!: Date;
  /**	Int32	事件类型	M	*/
  EventType!: number;
  /**	Int32	事件触发类型	M	*/
  TriggerType!: number;
  /**	DateTime	开始时间	O	*/
  @Transform(Transformer.DateTime)
  BeginTime?: Date;
  /**	DateTime	结束时间	O	*/
  @Transform(Transformer.DateTime)
  EndTime?: Date;
  /**	EventResource[]	报警事件资源列表	O	*/
  @Type(() => EventResource)
  Resources?: EventResource[];
  /**	BASE64	扩展数据	O	*/
  @Transform(Transformer.Base64)
  ExtensionData?: string;
  /**	GisPoint	Gis坐标	M	*/
  @Type(() => GisPoints)
  Location!: GisPoints;
  /**	String	事件配对ID	M	*/
  Guid!: string;
  /**	String	物件ID	M	*/
  RoadObjectId!: string;
}
