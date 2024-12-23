import { IModel } from '../../model.interface';
import { EnumValue } from '../enum-value.model';

/**	InputProxyCapability (代理输入通道能力)	*/
export class InputProxyCapability implements IModel {
  /**	Boolean	搜索代理通道是否支持	M	*/
  Searching!: boolean;
  /**	EnumValue[]	代理通道状态	O	*/
  ProxyChannelStates?: EnumValue[];
  /**	EnumValue[]	设备协议类型	O	*/
  DeviceProtocolTypes?: EnumValue[];
}
