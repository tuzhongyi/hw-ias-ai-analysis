import { IModel } from '../model.interface'
import { GisPoint } from './gis-point.model'

/**	GisArea (地理信息坐标区域)	*/
export class GisArea implements IModel {
  /**	GisPoint[]	坐标点	M	*/
  GisPoint!: GisPoint[]
  /**	Int32	坐标系类型	M	*/
  GisType!: number
}
