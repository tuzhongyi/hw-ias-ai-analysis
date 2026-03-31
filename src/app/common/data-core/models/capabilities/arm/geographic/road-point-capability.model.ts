import { Type } from 'class-transformer';
import { IModel } from '../../../interface/model.interface';
import { EnumNameValue } from '../../enum-name-value.model';

/**	RoadPointCapability (道路屏蔽点能力)	*/
export class RoadPointCapability implements IModel {
  /**	Boolean	是否支持工作表	M	R */
  ScheduleEnabled!: boolean;
  /**	EnumNameValue[]	道路屏蔽点类型	M	R */
  @Type(() => EnumNameValue)
  RoadPointTypes!: EnumNameValue<number>[];
}
