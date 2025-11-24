import { Type } from 'class-transformer';
import { IModel } from '../../model.interface';
import { EnumNameValue } from '../enum-name-value.model';

/**	DeviceCapability (设备能力)	*/
export class DeviceCapability implements IModel {
  /**	Boolean	NTP校时是否支持	M	*/
  NTPServer!: boolean;
  /**	EnumValue[]	NTP校时模式	O	*/
  @Type(() => EnumNameValue)
  NTPTimeMode?: EnumNameValue[];
  /**	Boolean	运行状态	M	*/
  RunningStatus!: boolean;
  /**	EnumValue[]	进程状态	O	*/
  @Type(() => EnumNameValue)
  ProcessStates?: EnumNameValue[];
}
