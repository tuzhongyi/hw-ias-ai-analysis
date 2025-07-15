import { Transform } from 'class-transformer';
import { IIdNameModel } from '../../../model.interface';
import { transformDateTime } from '../../../transformer';
/**	AnalysisTask (AI分析任务)	*/
export class AnalysisTask implements IIdNameModel<string, string | undefined> {
  /**	String	任务ID	O	*/
  Id!: string;
  /**	Int64	任务ID	O	*/
  IntId!: number;
  /**	String	任务名称	O	*/
  Name: string | undefined;
  /**	Int32	任务类型：101-商铺识别	M	*/
  TaskType!: number;
  /**	Int32	数据来源类型：0-视频文件	O	*/
  SourceType?: number;
  /**	String[]	数据来源：文件名称列表	O	*/
  Files?: string[];
  /**	Int32	分组ID，默认用户分组ID，创建时无需填写	O	*/
  GroupId?: number;
  /**	DateTime	创建时间	O	*/
  @Transform(transformDateTime)
  CreationTime?: Date;
  /**	Int32	任务状态, 取值: -1-加载中，0-未开始, 1-进行中, 2-完成, 3-失败	O	*/
  State?: number;
  /**	Int32	进度，0-100	O	*/
  Progress?: number;
  /**	DateTime	任务开始时间，开始后才有	O	*/
  @Transform(transformDateTime)
  StartTime?: Date;
  /**	DateTime	任务结束时间，结束后才有	O	*/
  @Transform(transformDateTime)
  StopTime?: Date;
  /**	Boolean	任务是否存在，一般情况下任务超过一定天数后将被删除。	O	*/
  Existed?: boolean;
}
