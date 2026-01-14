import { Type } from 'class-transformer';
import { IModel } from '../../../model.interface';
import { EnumNameValue } from '../../enum-name-value.model';

/**	RoadObjectCapability (道路固件能力)	*/
export class RoadObjectCapability implements IModel {
  /**	EnumNameValue[]	道路固件类型	M	*/
  @Type(() => EnumNameValue)
  ObjectTypes!: EnumNameValue<number>[];
  /**	EnumNameValue[]	道路物件事件类型	M	R */
  @Type(() => EnumNameValue)
  EventTypes!: EnumNameValue<number>[];
  /**	EnumNameValue[]	图片采集方案	M	R */
  @Type(() => EnumNameValue)
  ImageSamplingPlans!: EnumNameValue<number>[];
  /**	EnumNameValue[]	道路物件状态	M	R */
  @Type(() => EnumNameValue)
  ObjectStates!: EnumNameValue<number>[];
}
