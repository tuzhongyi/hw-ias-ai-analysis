import { Transform } from 'class-transformer';
import { IModel } from '../../../interface/model.interface';
import { Transformer } from '../../../transformer';

/**	GisPointMatchResult (地理信息坐标点匹配结果)	*/
export class GisPointMatchResult implements IModel {
  /**	Double	经度	M	*/
  @Transform(Transformer.Longitude)
  Longitude!: number;
  /**	Double	纬度	M	*/
  @Transform(Transformer.Latitude)
  Latitude!: number;
  /**	Double	高度	M	*/
  Altitude!: number;
  /**	Int32	楼层	O	*/
  Floor?: number;
  /**	Int32	坐标系类型	O	*/
  GisType?: number;
  /**	Double	速度，单位：km/h	O	*/
  Speed?: number;
  /**	Double	偏北角方向，0-360	O	*/
  Course?: number;
  /**	Int32	是否为高精度数值，0-普通，1-次高精度，2-高精度	O	*/
  HighPrecision?: number;
  /**	DateTime	经过时间	O	*/
  @Transform(Transformer.DateTime)
  OSDTime?: Date;
  /**	Boolean	是否经过	M	*/
  Matched!: boolean;
}
