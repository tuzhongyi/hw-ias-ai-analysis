import { Type } from 'class-transformer';
import { IIdModel } from '../../interface/model.interface';
import { Int2Number } from '../int-number-2.model';
import { IntNumber } from '../int-number.model';
import { RoadObjectEventDailyStatistic } from './road-object-event-daily-statistic.model';
import { RoadObjectOutline } from './road-object-outline.model';

/**	RoadObjectStatement (道路部件报表)	*/
export class RoadObjectStatement implements IIdModel {
  /**	String	报表ID	M	*/
  Id!: string;
  /**	Int32	报表类型，1-周，2-月	M	*/
  StatementType!: number;
  /**	Date	开始日期	M	*/
  BeginDate!: Date;
  /**	Date	结束日期	M	*/
  EndDate!: Date;
  /**	String	区划ID，街道和区级	M	*/
  DivisonId!: string;
  /**	String	区划名称	O	*/
  DivisionName?: string;
  /**	Int64	总数量	M	*/
  TotalNumber!: number;
  /**	IntNumber[]	部件类型数量	M	*/
  @Type(() => IntNumber)
  ObjectTypeNumbers!: IntNumber[];
  /**	IntNumber[]	部件状态分类	M	*/
  @Type(() => IntNumber)
  ObjectStateNumbers!: IntNumber[];
  /**	Int2Number[]	"分类+状态的细分统计数量
Value1：分类，
Value2：状态"	M	*/
  @Type(() => Int2Number)
  ObjectTypeStateNumbers!: Int2Number[];
  /**	Int64	逾期未检测数量（此处不需要，未检测的目标可以找State=0的统计）	O	*/
  UninspectedNumber?: number;
  /**	RoadObjectEventDailyStatistic[]	每日的事件数量统计	O	*/
  @Type(() => RoadObjectEventDailyStatistic)
  DailyEventTimes?: RoadObjectEventDailyStatistic[];
  /**	RoadObjectOutline[]	当前报表最后一天的数据状态	O	*/
  @Type(() => RoadObjectOutline)
  RoadObjects?: RoadObjectOutline[];
  /**	Int64	新增部件数量	O	*/
  NewObjectNumber?: number;
  /**	String	描述内容	O	*/
  Description?: string;
  /**	String	总结	O	*/
  Summarize?: string;
  /**	String[]	建议	O	*/
  Comments?: string[];
  /**	String[]	设备ID列表	O	*/
  DeviceIds?: string[];
}
