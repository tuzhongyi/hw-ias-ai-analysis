import { IModel } from '../model.interface'

/**	IPv4Address (IPv4地址)	*/
export class IPv4Address implements IModel {
  /**	String	IPv4地址：192.168.1.10	M	*/
  Address!: string
  /**	String	子网掩码：255.255.0.0	M	*/
  SubnetMask!: string
  /**	String	默认网关：192.168.1.1	M	*/
  DefaultGateway!: string
  /**	String	主DNS：192.168.1.1	O	*/
  PrimaryDNS?: string
  /**	String	备用DNS：114.114.114.114	O	*/
  SecondaryDNS?: string
}
