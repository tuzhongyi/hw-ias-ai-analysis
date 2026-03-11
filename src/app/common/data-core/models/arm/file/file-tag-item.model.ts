import { Transform } from 'class-transformer';
import { Time } from '../../common/time.model';
import { IModel } from '../../interface/model.interface';
import { Transformer } from '../../transformer';

/**	FileTagItem (视频的Tag信息)	*/
export class FileTagItem implements IModel {
  /**	Int64	坐标序号，从1开始	M	*/
  No!: number;
  /**	String	Tag事件唯一标识符	M	*/
  Guid!: string;
  /**	Int32	标签类型： 1-普通标记 2-开始标记，3-结束标记	M	*/
  TagType!: number;
  /**	Int32	标记的事件类型	O	*/
  EventType?: number;
  /**	DateTime	绝对时间	O	*/
  @Transform(Transformer.DateTime)
  OSDTime?: Date;
  /**	Time	相对时间	M	*/
  @Transform(Transformer.Time)
  OffsetTime!: Time;
  /**	String	描述内容	O	*/
  Description?: string;
}
