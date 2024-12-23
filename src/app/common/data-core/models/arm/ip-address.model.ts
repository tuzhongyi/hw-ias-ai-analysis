import { AddressingType } from '../../enums/addressing-type.enum'
import { IModel } from '../model.interface'
import { IPv4Address } from './ip-v4-address.model'

/**	IPAddress (IP地址)	*/
export class IPAddress implements IModel {
  /**
   * String	地址类型：
   * Static：静态IP(DHCP关闭)
   * Dynamic：动态IP(自动获取/DHCP开启)
   * M
   **/
  AddressingType!: AddressingType
  /**	IPv4Address	IPv4地址	M	*/
  IPv4Address!: IPv4Address
}
