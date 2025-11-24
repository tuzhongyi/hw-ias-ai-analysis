import { Type } from 'class-transformer';
import { IModel } from '../../model.interface';
import { EnumNameValue } from '../enum-name-value.model';

/**	GpsCapability (定位系统能力)	*/
export class GpsCapability implements IModel {
  /**	EnumNameValue[]	采样间隔，单位：ms	M	*/
  @Type(() => EnumNameValue)
  SimpleFrequencies!: EnumNameValue[];
  /**	EnumNameValue[]	采样筛选频率，N个采样选取1个，0表示关闭	M	*/
  @Type(() => EnumNameValue)
  SimpleRates!: EnumNameValue[];
  /**	EnumNameValue[]	GPS状态	M	*/
  @Type(() => EnumNameValue)
  GpsStates!: EnumNameValue[];
  /**	Boolean	是否有校准时间	M	*/
  TimeEnabled!: boolean;
}
