import { Type } from 'class-transformer';
import { IModel } from '../../../interface/model.interface';
import { EnumNameValue } from '../../enum-name-value.model';

/**	RoadAreaCapability (道路区域能力)	*/
export class RoadAreaCapability implements IModel {
  /**	Boolean	是否支持工作表	M	R */
  ScheduleEnabled!: boolean;
  /**	EnumNameValue[]	道路区域用途	M	R */
  @Type(() => EnumNameValue)
  RoadAreaUsageTypes!: EnumNameValue<number>[];
}
