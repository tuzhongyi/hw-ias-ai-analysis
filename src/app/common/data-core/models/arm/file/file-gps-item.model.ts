import { Transform } from 'class-transformer';
import { Time } from '../../common/time.model';
import { IModel } from '../../model.interface';
import {
  transformDateTime,
  transformLatitude,
  transformLongitude,
  transformTime,
} from '../../transformer';

/**	FileGpsItem (文件中的GPS信息)	*/

export class FileGpsItem implements IModel {
  /**	Int64	坐标序号，从1开始	M	*/
  No!: number;
  /**	Double	经度	M	*/
  @Transform(transformLongitude)
  Longitude!: number;
  /**	Double	纬度	M	*/
  @Transform(transformLatitude)
  Latitude!: number;
  /**	DateTime	绝对时间	O	*/
  @Transform(transformDateTime)
  OSDTime?: Date;
  /**	Time	相对时间	M	*/
  @Transform(transformTime)
  OffsetTime!: Time;

  /**	Double	速度，KM/h	O	R */
  Speed?: number;
  /**	Double	偏北角，顺时针0-360度	O	R */
  Course?: number;
  /**	String	机位编号	O	R */
  CameraNo?: string;
  /**	Double	加速度计X轴加速度，单位为m/s2	O	R */
  AccX?: number;
  /**	Double	加速度计Y轴加速度，单位为m/s2	O	R */
  AccY?: number;
  /**	String	道路ID	O	R */
  RoadId?: string;
  /**	String	道路名称	O	R */
  RoadName?: string;

  static position(a: FileGpsItem): number[] {
    return [a.Longitude, a.Latitude];
  }
}
