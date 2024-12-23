import { Type } from 'class-transformer'
import 'reflect-metadata'
import { ProxyChannelState } from '../../enums/proxy-channel-state.enum'
import { IIdNameModel } from '../model.interface'
import { VideoSourceChannel } from './video-source-channel.model'
/**	InputProxyChannel (代理通道)	*/
export class InputProxyChannel implements IIdNameModel<number> {
  /**	Int32	通道ID，从1开始	M	*/
  Id!: number
  /**	String	通道名称	M	*/
  Name!: string
  /**
   * Int32	机位，从1开始。
   * 1-10舱外
   * 11-20舱内
   * 21-30 红外
   * O
   **/
  PositionNo?: number
  /**	VideoSourceChannel	数据来源	M	*/
  @Type(() => VideoSourceChannel)
  SourceChannel!: VideoSourceChannel
  /**
   * String	通道状态：
   * Online：在线
   * Offline：不在线
   * Locked：用户锁定
   * O
   **/
  ChannelState?: ProxyChannelState
  /**	String	通道GUID	O */
  Guid?: string
  /**	String	平台接入ID	O	*/
  PlatformAccessId?: string
  /**	String	视频分析接入方式	O	*/
  AnalysisAccessType?: string
  /**	String	用途	O	*/
  Usage?: string
  /**	Boolean	过滤策略3是否启用，防止部分厢房无法识别湿垃圾桶	O	*/
  Filter3Enabled?: boolean
  /**	Boolean	是否正在录像	O	*/
  Recording?: boolean
  /**	Boolean	是否自动录像	O	*/
  AutoRecord?: boolean

  static create() {
    let data = new InputProxyChannel()
    data.Id = 0
    data.SourceChannel = new VideoSourceChannel()
    return data
  }
}
