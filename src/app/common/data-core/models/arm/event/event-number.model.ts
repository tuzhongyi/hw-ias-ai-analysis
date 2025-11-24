import { IModel } from '../../model.interface';

/**	EventNumber (事件数量)	*/
export class EventNumber implements IModel {
  /**	Int32	事件类型	M	*/
  EventType!: number;
  /**	Int64	当日事件数量	M	*/
  DayNumber!: number;
  /**	Int64	当日时间段内事件数量	O	*/
  DeltaNumber?: number;
}
