import {
  IParams,
  PagedDurationParams,
} from '../../../../models/params.interface';

export class GetAnalysisTaskListParams extends PagedDurationParams {
  /**	String	任务名称	O	*/
  Name?: string;
  /**	Strng[]	任务ID	O	*/
  TaskIds?: string[];
  /**	Int32[]	任务类型	O */
  TaskTypes?: number[];
  /**	Int32[]	任务状态	O */
  TaskStates?: number[];
  /**	Int32	分组ID	O	*/
  GroupId?: number;

  /**	String	升序属性，不区分大小写	O */
  Asc?: string;
  /**	String	降序属性，不区分大小写	O */
  Desc?: string;
}

export class GetAnalysisTaskResultListParams extends PagedDurationParams {
  /**	String	任务名称	O	*/
  Name?: string;
  /**	Strng[]	任务ID	O	*/
  TaskIds?: string[];
  /**	Int32	任务类型	O	*/
  TaskType?: number;
  /**	Int32	分组ID	O	*/
  GroupId?: number;
}
export class AnalysisTaskSource implements IParams {
  /**	Int32	数据来源类型：0-视频文件	M	RW */
  SourceType!: number;
  /**	String[]	数据来源：视频文件名称	M	RW */
  Files?: string[];
}
