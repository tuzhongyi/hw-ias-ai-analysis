import { Transform } from 'class-transformer';
import {
  IParams,
  PagedDurationParams,
} from '../../../../models/params.interface';
import {
  transformLatitude,
  transformLongitude,
} from '../../../../models/transformer';

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
export class GetShopTaskStatisticParams implements IParams {
  /**	String[]	任务ID列表	M */
  TaskIds!: string[];
}
export class GetTaskRecordFileParams implements IParams {
  /**	Double	经度	M */
  @Transform(transformLongitude)
  Longitude!: number;
  /**	Double	纬度	M */
  @Transform(transformLatitude)
  Latitude!: number;
  /**	Int32	通道编号，从1开始1-5	O */
  Channel?: number;
  /**	Double	单个通道的总时长，单位：秒 默认10秒	O */
  Duration?: number;
}
export class GetTaskRecordFileGpsItemsParams extends GetTaskRecordFileParams {
  /**	Boolean	是否根据道路矫正坐标，默认false：不矫正	O */
  Rectified?: boolean;
}
