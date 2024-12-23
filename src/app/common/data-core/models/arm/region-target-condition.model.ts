import { IModel } from '../model.interface'
import { Polygon } from './polygon.model'

/**	RegionTargetCondition (目标去重过滤条件)	*/
export class RegionTargetCondition implements IModel {
  /**	Polygon[]	区域列表	M	*/
  Regions!: Polygon[]
  /**	Int32	区域内目标面积与目标总面积占比[0-100]	M	*/
  TargetRatio!: number
}
