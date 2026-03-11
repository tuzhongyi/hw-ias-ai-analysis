import { Type } from 'class-transformer';
import { IModel } from '../../../interface/model.interface';
import { EnumNameValue } from '../../enum-name-value.model';

/**	RoadSectionCapability (路段能力)	*/
export class RoadSectionCapability implements IModel {
  /**	Boolean	是否支持工作表	M	*/
  ScheduleEnabled!: boolean;
  /**	EnumNameValue[]	路段类型	M	*/
  @Type(() => EnumNameValue)
  RoadSectionTypes!: EnumNameValue<number>[];
}
