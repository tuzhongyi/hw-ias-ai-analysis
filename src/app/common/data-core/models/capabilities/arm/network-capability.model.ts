import { Type } from 'class-transformer';
import { IModel } from '../../model.interface';
import { EnumNameValue } from '../enum-name-value.model';

/**	NetworkCapability (网络能力)	*/
export class NetworkCapability implements IModel {
  /**	Boolean	SSH是否支持	M	*/
  @Type(() => EnumNameValue)
  SSH!: boolean;
  /**	Boolean	平台接入是否支持	M	*/
  @Type(() => EnumNameValue)
  PlatformAccess!: boolean;
  /**	Boolean	平台部署是否支持	M	*/
  @Type(() => EnumNameValue)
  Deployment!: boolean;
  /**	EnumValue[]	支持的平台协议版本号	O	*/
  @Type(() => EnumNameValue)
  PlatformProtocolVersions?: EnumNameValue[];
  /**	EnumValue[]	支持的网卡速率	O	*/
  @Type(() => EnumNameValue)
  NetworkInterfaceSpeeds?: EnumNameValue[];
  /**	EnumValue[]	支持的网卡类型	O	*/
  @Type(() => EnumNameValue)
  NetworkInterfaceDuplexs?: EnumNameValue[];
  /**	EnumValue[]	支持的IP地址获取类型	O	*/
  @Type(() => EnumNameValue)
  AddressingTypes?: EnumNameValue[];
}
