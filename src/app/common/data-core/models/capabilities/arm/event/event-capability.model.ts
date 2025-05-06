import { IModel } from '../../../model.interface';
import { EnumNameValue } from '../../enum-name-value.model';

/**	EventCapability (事件能力)	*/
export class EventCapability implements IModel {
  /**	EnumNameValue[]	资源类型	O	*/
  ResourceTypes?: EnumNameValue<number>[];
  /**	EnumNameValue[]	事件类型	O	*/
  EventTypes?: EnumNameValue<number>[];
  /**	EnumNameValue[]	触发类型	O	*/
  TriggerTypes?: EnumNameValue<number>[];
}
