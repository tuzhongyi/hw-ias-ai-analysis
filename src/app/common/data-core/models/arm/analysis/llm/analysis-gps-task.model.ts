import { Transform, Type } from 'class-transformer';
import { IIdNameModel } from '../../../model.interface';
import { Transformer } from '../../../transformer';
import { GisPoints } from '../../gis-point.model';
import { WeekTimeSegment } from '../segment/week-time-segment.model';
import { SceneImage } from './scene-Image.model';

/**	AnalysisGpsTask (Gps坐标任务)	*/
export class AnalysisGpsTask implements IIdNameModel {
  /**	String	任务ID	M	*/
  Id!: string;
  /**	String	任务名称	M	*/
  Name!: string;
  /**	GisPoint	分析位置Gis坐标, WGS84坐标	M	*/
  @Transform(Transformer.GisPoint)
  Location!: GisPoints;
  /**	Int32[]	采样机位（资源ID），1-n	M	*/
  CapturePositions!: number[];
  /**	Double	抓图间隔，单位：米，默认：5米	O	*/
  CaptureInterval?: number;
  /**	Int32	抓图次数，最少1次	O	*/
  CaptureTimes?: number;
  /**	Double	抓图距离半径，单位：米，默认：20	M	*/
  CaptureRadius!: number;
  /**	Int32	最大视频时长，默认：15秒	O	*/
  MaxTimeSpan?: number;
  /**	Int32	任务类型：201-抓图任务，202-视频任务	M	*/
  TaskType!: number;
  /**	Int32	数据来源类型：0-视频文件，1-视频图片，目前只支持图片	O	*/
  SourceType?: number;
  /**	String	描述内容	O	*/
  Description?: string;
  /**	SceneImage[]	场景图片列表	O	*/
  @Type(() => SceneImage)
  Images?: SceneImage[];
  /**	Int32	分组ID，默认用户分组ID，创建时无需填写	O	*/
  GroupId?: number;
  /**	String	分组GUID，用于中心服务器区分来源	O	*/
  GroupGuid?: string;
  /**	String	分组名称	O	*/
  GroupName?: string;
  /**	DateTime	创建时间	O	*/
  @Transform(Transformer.DateTime)
  CreationTime?: Date;
  /**	DateTime	更新时间	O	*/
  @Transform(Transformer.DateTime)
  UpdateTime?: Date;
  /**	DateTime	有效时间，默认：永久有效	O	*/
  @Transform(Transformer.DateTime)
  ExpiredTime?: Date;
  /**	DateTime	最后一次上传抓图信息的时间	O	*/
  @Transform(Transformer.DateTime)
  LastUploadTime?: Date;
  /**	String	分析用提示词	O	*/
  Prompt?: string;
  /**	String	分析用输出结构	O	*/
  OutputFormat?: string;
  /**	WeekTimeSegment	布防工作表	O	*/
  @Type(() => WeekTimeSegment)
  Schedule?: WeekTimeSegment;
  /**	String	场景地址	O	*/
  Address?: string;
  /**	Int32	场景类型(保留)，1-重点关注，2-日常巡查	O 	*/
  SceneType!: number;
  /**	String	场景名称	O	*/
  SceneName?: string;
}
