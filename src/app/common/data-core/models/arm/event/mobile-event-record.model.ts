import { Transform, Type } from 'class-transformer';
import 'reflect-metadata';
import { IIdModel } from '../../model.interface';
import { transformDateTime } from '../../transformer';
import { GisPoints, transformGisPoint } from '../gis-point.model';
import { Assignment } from './assignment.model';
import { EventResourceContent } from './event-resource-content.model';

/**	EventRecord (AI事件记录)	*/
export class MobileEventRecord implements IIdModel {
  /**	String	事件ID	M	*/
  Id!: string;
  /**	String	设备ID，设备序列号	M	*/
  DeviceId!: string;
  /**	DateTime	事件时间	M	*/
  @Transform(transformDateTime)
  EventTime!: Date;
  /**	Int32	事件类型	M	*/
  EventType!: number;
  /**	Int32	事件触发类型	M	*/
  TriggerType!: number;
  /**	DateTime	开始时间	O	*/
  @Transform(transformDateTime)
  BeginTime?: Date;
  /**	DateTime	结束时间	O	*/
  @Transform(transformDateTime)
  EndTime?: Date;
  /**	String	描述内容	O	*/
  Description?: string;
  /**	BASE64	扩展数据	O	*/
  ExtensionData?: string;
  /**	EventResourceContent[]	报警事件资源列表	O	*/
  @Type(() => EventResourceContent)
  Resources?: EventResourceContent[];
  /**	Boolean	是否为实时事件，true：实时事件，false：非实时事件	O	*/
  IsLiveEvent?: boolean;
  /**	Assignment	派单和处置信息	O	*/
  @Type(() => Assignment)
  Assignment?: Assignment;
  /**	GisPoint	Gis坐标	O */
  @Transform(transformGisPoint)
  Location?: GisPoints;
  /**	Int32	用户分组ID 	O */
  GroupId?: number;
  /**	String	任务ID（店招新增，店招消失事件）	O */
  TaskId?: string;
  /**	String	事件配对ID	O */
  Guid?: string;
  /**	String	分组GUID，用于中心服务器区分来源	O */
  GroupGuid?: string;
  /**	String	分组名称	O */
  GroupName?: string;
  /**	String	音频文件ID	O */
  AudioUrl?: string;
  /**	String	音频文件语音内容，一般情况下5分钟内会完成音频文件内容的解析	O */
  AudioContent?: string;
  /**	Int32	突发情况分类	O */
  EmergencyType?: number;
  /**	String	突发情况描述	O */
  EmergencyDescription?: string;
}
