import { Transform } from 'class-transformer';
import { IModel } from '../../model.interface';
import { Transformer } from '../../transformer';

/**	GpsInfo (GPS信息)	*/
export class GpsInfo implements IModel {
  /**	Double	经度，东经正数，西经负数	O	*/
  @Transform(Transformer.Longitude)
  Longitude?: number;
  /**	Double	纬度，北纬正数，南纬负数	O	*/
  @Transform(Transformer.Latitude)
  Latitude?: number;
  /**	String	目前只有WGS84一种情况	O	*/
  GisType?: string;
  /**	String	GPS设备状态	M	*/
  State!: string;
  /**	Double	地面航向，真北方向顺时针0-359.999，目前不支持	O	*/
  Course?: number;
  /**	Double	航行速度，单位km/h或节	O	*/
  Speed?: number;
  /**	Int32	卫星数量，0表示没有卫星	O	*/
  SatelliteNumber?: number;
  /**	DateTime	数据更新时间	M	*/
  @Transform(Transformer.DateTime)
  UpdateTime!: Date;
}
