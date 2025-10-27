import { Type } from 'class-transformer';
import { IModel } from '../../../model.interface';
import { DayTimeSegment } from './day-time-segment.model';

/**	WeekTimeSegment (周工作表时间段)	*/
export class WeekTimeSegment implements IModel {
  /**	DayTimeSegment[]	7天的日工作时间段	M	*/
  @Type(() => DayTimeSegment)
  Days!: DayTimeSegment[];
}
