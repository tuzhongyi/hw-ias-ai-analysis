import { Type } from 'class-transformer';
import { IModel } from '../../model.interface';
import { EnumNameValue } from '../enum-name-value.model';

/**	SecurityCapability (网络安全能力)	*/
export class SecurityCapability implements IModel {
  /**	EnumValue[]	支持的用户认证类型	M	*/
  @Type(() => EnumNameValue)
  AuthTypes!: EnumNameValue[];
  /**	EnumValue[]	用户权限	M	*/
  @Type(() => EnumNameValue)
  PriorityTypes!: EnumNameValue[];
}
