import { DeviceProtocolType } from '../../enums/device-protocol-type.enum'
import { IIdModel } from '../model.interface'

/**	VideoSourceDescriptor (视频数据来源)	*/
export class VideoSourceDescriptor implements IIdModel<number> {
  /**	Int32	序号，从1开始	M	*/
  Id!: number
  /**	String	设备IP地址：192.168.1.2	M	*/
  HostAddress!: string
  /**	Int32	设备端口号	M	*/
  PortNo!: number
  /**	String	协议类型：Howell8000	M	*/
  ProtocolType!: DeviceProtocolType
  /**	Int32	设备视频通道数量	M	*/
  ChannelNumber!: number
  /**	String	设备用户名	O	*/
  UserName?: string
  /**	String	设备密码	O	*/
  Password?: string
  /**	String	设备ID	O	*/
  DeviceId?: string
  /**	String	设备序列号	O	*/
  SerialNumber?: string
  /**
   * String	物理地址
   * 格式：FC-9F-16-00-23-40
   * O
   **/
  MACAddress?: string
  /**	Int32	网页端口号	O	*/
  WebPortNo?: number
  /**	String	设备型号，G3、G5	O	*/
  DeviceModel?: string
}
