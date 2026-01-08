import { TimeModel } from '../../time-control/time-control.model';

export interface SegmentTimeModel {
  /**	Time	开始时间，00:00-23:59	M	*/
  StartTime: TimeModel;
  /**	Time	结束时间，00:00-23:59	M	*/
  StopTime: TimeModel;
}
