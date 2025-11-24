import { Transform } from 'class-transformer';
import { IParams } from '../../../../../models/params.interface';
import { Transformer } from '../../../../../models/transformer';

export class GetEventNumbersParams implements IParams {
  /**	Date	开始日期	M	*/
  @Transform(Transformer.Date)
  BeginDate!: Date;
  /**	Date	结束日期	M	*/
  @Transform(Transformer.Date)
  EndDate!: Date;
  /**	String	区划ID	M	*/
  DivisionId!: string;
  /**	Int32	区划类型,3-街道，4-网格	M	*/
  DivisionType!: number;
  /**
   * Int32
   * 统计时间单位：1-Day
   * 目前只支持按天统计
   * O
   **/
  TimeUnit?: number;
}
