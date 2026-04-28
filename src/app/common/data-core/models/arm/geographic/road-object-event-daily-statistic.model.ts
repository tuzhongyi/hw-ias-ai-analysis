import { Transform } from 'class-transformer';
import { IModel } from '../../interface/model.interface';
import { Transformer } from '../../transformer';

/**	RoadObjectEventDailyStatistic (部件每日事件统计结果)	*/
export class RoadObjectEventDailyStatistic implements IModel {
  /**	Date	日期	M	*/
  @Transform(Transformer.Date)
  Date!: Date;
  /**	Int32	正常次数	M	*/
  NormalTimes!: number;
  /**	Int32	异常次数	M	*/
  BreakageTimes!: number;
  /**	Int32	消失次数	M	*/
  DisappearTimes!: number;
}
