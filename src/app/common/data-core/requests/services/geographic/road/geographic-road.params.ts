import { GisPoint } from '../../../../models/arm/gis-point.model';
import { PagedParams } from '../../../../models/params.interface';

export class GetRoadsParams extends PagedParams {
  /**	String[]	店招ID列表	O	*/
  Ids?: string[];
  /**	String	道路名称	O	*/
  Name?: string;
  /**	Int32	用户分组ID	O	*/
  GroupId?: number;
  /**	Int32	道路分类	O	*/
  Classification?: number;
  /**	GisPont	查找离GPS坐标最近的道路	O */
  GeoPoint?: GisPoint;
  /**	Double	最大距离，单位：米，与GeoPoint配合使用	O */
  MaxDistance?: number;
}
