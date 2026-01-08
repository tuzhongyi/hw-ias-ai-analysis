import { Type } from 'class-transformer';
import { IModel } from '../../../model.interface';
import { EnumNameValue } from '../../enum-name-value.model';

/**	RoadObjectCapability (道路固件能力)	*/
export class RoadObjectCapability implements IModel {
  /**	EnumNameValue[]	道路固件类型	M	*/
  @Type(() => EnumNameValue)
  ObjectTypes!: EnumNameValue<number>[];
}
