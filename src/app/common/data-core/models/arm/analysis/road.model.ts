import { IIdNameModel } from '../../model.interface';
import { GisPoint } from '../gis-point.model';

/**	Road (道路信息)	*/
export class Road implements IIdNameModel {
  /**	String	道路ID	M	*/
  Id!: string;
  /**	String	道路名称	M	*/
  Name!: string;
  /**	Int32	用户分组ID	O	*/
  GroupId?: number;
  /**	Int32	分类，保留	O	*/
  Classification?: number;
  /**	String	描述	O	*/
  Description?: string;
  /**	GisPoint[]	GPS坐标	O	*/
  GeoLine?: GisPoint[];
}
