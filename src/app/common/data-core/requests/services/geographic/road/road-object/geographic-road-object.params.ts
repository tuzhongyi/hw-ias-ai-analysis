import { GisPoint } from '../../../../../models/arm/gis-point.model';
import { PagedParams } from '../../../../../models/params.interface';

export class GetRoadObjectsParams extends PagedParams {
  /**	String[]	固件ID列表	O	*/
  Ids?: string[];
  /**	String	名称，支持LIKE	O	*/
  Name?: string;
  /**	Int32[]	固件类型	O	*/
  ObjectTypes?: number[];
  /**	String	分组ID	O	*/
  GroupGuid?: string;
  /**	String	地址，支持LIKE	O	*/
  Address?: string;
  /**	String[]	区划ID	O	*/
  DivisionIds?: string[];
  /**	GisPoint	照片Gis坐标	D	*/
  Location?: GisPoint;
  /**	Double	单位：米，必须与Location一起出现	D	*/
  LocationDistance?: number;
  /**	Int32	物件分类，用于分辨不同层级和重要度的物件	O	*/
  Category?: number;
  /**	Int32[]	物件状态	O	*/
  ObjectStates?: number[];
  /**	String	升序属性，不区分大小写	O	*/
  Asc?: string;
  /**	String	降序属性，不区分大小写	O	*/
  Desc?: string;
}
