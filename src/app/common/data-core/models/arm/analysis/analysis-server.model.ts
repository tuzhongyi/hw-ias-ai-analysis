import { IIdNameModel } from '../../model.interface';

/**	AnalysisServer (本地分析服务器)	*/
export class AnalysisServer
  implements IIdNameModel<string, string | undefined>
{
  /**	String	ID	M */
  Id!: string;
  /**	String	名称	O	*/
  Name: string | undefined;
  /**	String	IP地址	M	*/
  IPAddress!: string;
  /**	Int32	端口号	M	*/
  Port!: number;
  /**	String	用户名	O	*/
  Username?: string;
  /**	String	密码	O	*/
  Password?: string;
  /**	String	协议类型：Howell，目前不区分协议类型。	O	*/
  ProtocolType?: string;
  /**	Int32	数据刷新间隔，单位：ms，默认300秒。	O	*/
  Interval?: number;
  /**	Int32	状态，0-正常，1-离线	O	*/
  Status?: number;
  /**	String	事件目标地址，HTTP-URL，默认写死本地127.0.0.1的2.4.3.6的地址和路径。	O	*/
  EventDest?: string;
}
