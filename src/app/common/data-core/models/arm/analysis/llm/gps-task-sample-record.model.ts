import { Transform, Type } from 'class-transformer';
import { IIdModel } from '../../../model.interface';
import { Transformer } from '../../../transformer';
import { GisPoints } from '../../gis-point.model';
import { SceneImage } from './scene-Image.model';

import { GpsTaskResourceContent } from './gps-task-resource-content.model';

/**	GpsTaskSampleRecord (GPS任务取样记录)	*/
export class GpsTaskSampleRecord implements IIdModel {
  /**	String	唯一ID	M	*/
  Id!: string;
  /**	String	对应任务的唯一ID	M	*/
  TaskId!: string;
  /**	Int32	任务类型：201-抓图分析，202-视频任务	M	*/
  TaskType!: number;
  /**	DateTime	采样时间	M	*/
  @Transform(Transformer.DateTime)
  Time!: Date;
  /**	Int32	尝试次数，从1开始	M	*/
  Attempts!: number;
  /**	DateTime	开始时间	O	*/
  @Transform(Transformer.DateTime)
  BeginTime?: Date;
  /**	DateTime	结束时间	O	*/
  @Transform(Transformer.DateTime)
  EndTime?: Date;
  /**	GpsTaskResourceContent[]	报警事件资源列表	O	*/
  @Type(() => GpsTaskResourceContent)
  Resources?: GpsTaskResourceContent[];
  /**	BASE64	扩展数据	O	*/
  ExtensionData?: string;
  /**	GisPoint	Gis坐标	M	*/
  @Transform(Transformer.GisPoint)
  Location!: GisPoints;
  /**	Double	与任务GPS点的距离，单位：米	M	*/
  Distance!: number;
  /**	String	配对ID	M	*/
  Guid!: string;
  /**	String	取样设备ID	M	*/
  DeviceId!: string;
  /**	Int32	用户分组ID	O	*/
  GroupId?: number;
  /**	String	分组GUID，用于中心服务器区分来源	O	*/
  GroupGuid?: string;
  /**	String	分组名称	O	*/
  GroupName?: string;
  /**	String	区划ID	O	*/
  DivisionId?: string;
  /**	String	描述内容	O	*/
  Description?: string;
  /**	SceneImage[]	场景图片列表	O	*/
  Images?: SceneImage[];
  /**	String	分析用提示词	O	*/
  Prompt?: string;
  /**	String	分析用输出结构	O	*/
  OutputFormat?: string;
  /**	Boolean	是否LLM确认结果	O	*/
  Confirmed?: boolean;

  /**	DateTime	确认时间	O	*/
  @Transform(Transformer.DateTime)
  ConfirmedTime?: Date;
  /**	Double	场景匹配百分比，0-100	O	*/
  SceneMatchPercent?: number;
  /**	Double	场景识别结果置信度，0-100	O	*/
  SceneResultConfidence?: number;
  /**	String	场景识别结果	O	*/
  SceneLLMResult?: string;
  /**	Boolean	是否为报警记录	O	*/
  IsAlarmRecord?: boolean;
  /**	Int32	分类类型，暂时保留。根据需求扩展	O	*/
  Classification?: number;
  /**	SceneImage[]	场景比配图片列表	O	*/
  SceneMatchImages?: SceneImage[];
  /**	String	场景地址	O	*/
  Address?: string;
  /**	Int32	场景类型(保留)	O 	*/
  SceneType?: number;
  /**	String	场景名称	O	*/
  SceneName?: string;
}
