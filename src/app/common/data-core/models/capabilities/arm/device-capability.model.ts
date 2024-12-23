import { IModel } from '../../model.interface'
import { EnumNameValue } from '../enum-name-value.model'

/**	DeviceCapability (设备能力)	*/
export class DeviceCapability implements IModel {
  /**	Boolean	NTP校时是否支持	M	*/
  NTPServer!: boolean
  /**	EnumValue[]	NTP校时模式	O	*/
  NTPTimeMode?: EnumNameValue[]
  /**	Boolean	运行状态	M	*/
  RunningStatus!: boolean
  /**	EnumValue[]	进程状态	O	*/
  ProcessStates?: EnumNameValue[]
  /**	EnumNameValue[]	IO输入输出状态	O	R */
  IOStates?: EnumNameValue[]
  /**	EnumNameValue[]	针脚工作模式	O	R */
  PinModes?: EnumNameValue[]
  /**	EnumNameValue[]	针脚电阻模式	O	R */
  PudModes?: EnumNameValue[]
  /**	EnumNameValue[]	投口类型	O	R */
  DropPortTypes?: EnumNameValue[]
  /**	EnumNameValue[]	投口状态	O	R */
  DropPortStates?: EnumNameValue[]
  /**	EnumNameValue[]	投口垃圾桶状态	O	R */
  TrashCanPortStates?: EnumNameValue[]
}
