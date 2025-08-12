import { Transform } from 'class-transformer';
import { NTPTimeMode } from '../../enums/ntp-time-mode.enum';
import { IModel } from '../model.interface';
import { Transformer } from '../transformer';
import { NTPServer } from './ntp-server.model';

/**	SystemTime (系统时间)	*/
export class SystemTime implements IModel {
  /**	String	时间模式:Manual，NTP	M	*/
  TimeMode!: NTPTimeMode;
  /**	DateTime	本地时间	M	*/
  @Transform(Transformer.DateTime)
  LocalTime!: Date;
  /**	String	默认：CST-8:00:00，暂时不允许修改	M	*/
  TimeZone!: string;
  /**	NTPServer	校时服务器信息，时间模式为NTP时有效。	O	*/
  NTPServer?: NTPServer;
}
