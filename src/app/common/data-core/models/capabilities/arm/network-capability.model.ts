import { IModel } from '../../model.interface'
import { EnumNameValue } from '../enum-name-value.model'

/**	NetworkCapability (网络能力)	*/
export class NetworkCapability implements IModel {
  /**	Boolean	SSH是否支持	M	*/ SSH!: boolean
  /**	Boolean	平台接入是否支持	M	*/ PlatformAccess!: boolean
  /**	Boolean	平台部署是否支持	M	*/ Deployment!: boolean
  /**	EnumValue[]	支持的平台协议版本号	O	*/ PlatformProtocolVersions?: EnumNameValue[]
  /**	EnumValue[]	支持的网卡速率	O	*/ NetworkInterfaceSpeeds?: EnumNameValue[]
  /**	EnumValue[]	支持的网卡类型	O	*/ NetworkInterfaceDuplexs?: EnumNameValue[]
  /**	EnumValue[]	支持的IP地址获取类型	O	*/ AddressingTypes?: EnumNameValue[]
}
