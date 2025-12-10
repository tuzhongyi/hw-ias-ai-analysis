import {
  PagedDurationParams,
  PagedParams,
} from '../../../../models/params.interface';

export class GetAnalysisGpsTaskListParams extends PagedParams {
  /**	String	任务名称	O	*/
  Name?: string;
  /**	Strng[]	任务ID	O	*/
  TaskIds?: string[];
  /**	Int32[]	任务类型	O	*/
  TaskTypes?: number[];
  /**	Int32	分组ID	O	*/
  GroupId?: number;
  /**	String	分组GUID，用于中心服务器区分来源	O	*/
  GroupGuid?: string;
  /**	String	升序属性，不区分大小写	O	*/
  Asc?: string;
  /**	String	降序属性，不区分大小写	O	*/
  Desc?: string;
}

export class GetAnalysisGpsTaskSampleListParams extends PagedDurationParams {
  /**	String	任务ID	O	*/
  TaskId?: string;
  /**	Int32	任务类型：201-抓图分析，202-视频任务	O	*/
  TaskType?: number;
  /**	String	配对ID	O	*/
  Guid?: string;
  /**	String	取样设备ID	O	*/
  DeviceId?: string;
  /**	String	分组GUID，用于中心服务器区分来源	O	*/
  GroupGuid?: string;
  /**	String	区划ID	O	*/
  DivisionId?: string;
  /**	Boolean	是否已确认结果	O	*/
  Confirmed?: boolean;
  /**	Boolean	是否为报警记录	O	*/
  IsAlarmRecord?: boolean;
  /**	Int32	场景分类	O	*/
  Classification?: number;
  /**	String	升序属性，不区分大小写	O	*/
  Asc?: string;
  /**	String	降序属性，不区分大小写	O	*/
  Desc?: string;

  /**	String	网格ID	O */
  GridCellId?: string;
}
