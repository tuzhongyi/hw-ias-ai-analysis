import { Transform } from 'class-transformer';
import { IModel } from '../../../model.interface';
import { Transformer } from '../../../transformer';
import { GisPoints } from '../../gis-point.model';

/**	GpsTaskResourceContent (GPS任务资源内容)	*/
export class GpsTaskResourceContent implements IModel {
  /**	String	资源ID	M	*/
  ResourceId!: string;
  /**	Int32	资源类型	M	*/
  ResourceType!: number;
  /**	String	资源名称	M	*/
  ResourceName!: string;
  /**	Int32	摄像机机位	O	*/
  PositionNo?: number;
  /**
   * String
   * 机位方向:
   * Left：左侧
   * Right：右侧
   * Front：前方
   * Back：后方
   * O
   **/
  CameraSide?: string;
  /**	Int64	数值	O	*/
  Value?: number;
  /**	String	图片地址	O	*/
  ImageUrl?: string;
  /**	String	录像地址	O	*/
  RecordUrl?: string;
  /**	GisPoint	Gis坐标	O	*/
  @Transform(Transformer.GisPoint)
  Location?: GisPoints;
}
