import { Transform, Type } from 'class-transformer';
import { IModel } from '../../model.interface';
import { Transformer } from '../../transformer';
import { EventNumber } from './event-number.model';

/**	EventNumberStatistic (事件统计信息)	*/
export class EventNumberStatistic implements IModel {
  /**	EventNumber[]	事件数量	M	*/
  @Type(() => EventNumber)
  EventNumbers!: EventNumber[];
  /**	DateTime	开始时间	M	*/
  @Transform(Transformer.DateTime)
  BeginTime!: Date;
  /**	DateTime	结束时间	M	*/
  @Transform(Transformer.DateTime)
  EndTime!: Date;
}
