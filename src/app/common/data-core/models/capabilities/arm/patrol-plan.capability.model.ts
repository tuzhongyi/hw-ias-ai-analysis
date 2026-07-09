/**	PatrolPlanCapability (巡逻计划能力)	*/

import { Type } from 'class-transformer';
import { IModel } from '../../interface/model.interface';
import { EnumNameValue } from '../enum-name-value.model';

export class PatrolPlanCapability implements IModel {
  /**	Boolean	是否启用工作表	M	*/
  ScheduleEnabled!: boolean;
  /**	EnumNameValue[]	路段方向类型	M	*/
  @Type(() => EnumNameValue)
  RoadDirectionTypes!: EnumNameValue[];
  /**	EnumNameValue[]	巡逻计划类型	M	*/
  @Type(() => EnumNameValue)
  PatrolPlanTypes!: EnumNameValue[];
}
