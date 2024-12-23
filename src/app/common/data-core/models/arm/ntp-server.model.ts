import { IModel } from '../model.interface'

/**	3.1.9 NTPServer (NTP校时服务器参数)	*/
export class NTPServer implements IModel {
  /**	String	NTP服务器地址	M	*/
  HostAddress!: string
  /**	Int32	服务器端口号	M	*/
  PortNo!: number
  /**	Int32	校时时间间隔，(单位：分钟)	M	*/
  SynchronizeInterval!: number
}
