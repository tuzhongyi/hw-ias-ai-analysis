import { PagedDurationParams } from '../../../../models/params.interface';

export class GetEventsParams extends PagedDurationParams {
  /**	Int32	事件类型	O	*/
  EventType?: number;
  /**	Boolean	是否已派单，true：已派单	O	*/
  Assigned?: boolean;
  /**	Boolean	是否已处置，true：已处置	O	*/
  Handled?: boolean;
  /**	Boolean	是否为误报，true：误报	O	*/
  IsMisInfo?: boolean;
}
