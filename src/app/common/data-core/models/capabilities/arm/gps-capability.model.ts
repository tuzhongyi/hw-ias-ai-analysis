import { IModel } from '../../model.interface'
import { EnumNameValue } from '../enum-name-value.model'

/**	GpsCapability (定位系统能力)	*/
export class GpsCapability implements IModel {
  /**	EnumNameValue[]	采样间隔，单位：ms	M	*/
  SimpleFrequencies!: EnumNameValue[]
  /**	EnumNameValue[]	采样筛选频率，N个采样选取1个，0表示关闭	M	*/
  SimpleRates!: EnumNameValue[]
  /**	EnumNameValue[]	GPS状态	M	*/
  GpsStates!: EnumNameValue[]
  /**	Boolean	是否有校准时间	M	*/
  TimeEnabled!: boolean
}
