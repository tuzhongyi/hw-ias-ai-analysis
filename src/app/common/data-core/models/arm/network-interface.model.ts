import { NetworkInterfaceDuplex } from '../../enums/network-interface-duplex.enum'
import { NetworkInterfaceSpeed } from '../../enums/network-interface-speed.enum'
import { IIdModel } from '../model.interface'
import { IPAddress } from './ip-address.model'

/**	NetworkInterface (网络接口信息)	*/
export class NetworkInterface implements IIdModel {
  /**	String	接口ID	M	*/
  Id!: string
  /**	Boolean	网卡自适应，true、false	M	*/
  AutoNegotiation!: boolean
  /**
   * String	网卡速率，
   * M10：10兆，
   * M100：100兆
   * M1000：1000兆
   * 只有当AutoNegotiation=false时有效
   * D
   **/
  Speed?: NetworkInterfaceSpeed
  /**
   * String	网卡类型：
   * Full：全双工
   * Half：半双工
   * 只有当AutoNegotiation=false时有效
   * D
   **/
  Duplex?: NetworkInterfaceDuplex
  /**	Int32	最大传输单元：默认1500	M	*/
  MTU!: number
  /**
   * String	物理地址
   * 格式：FC-9F-16-00-23-40
   * M
   **/
  MACAddress!: string
  /**	IPAddress	IP地址	M	*/
  IPAddress!: IPAddress
}
