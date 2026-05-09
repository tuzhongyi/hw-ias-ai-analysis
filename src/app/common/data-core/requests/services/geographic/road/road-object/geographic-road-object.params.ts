import { Transform } from 'class-transformer';
import { GisPoint } from '../../../../../models/arm/gis-point.model';
import {
  IParams,
  PagedParams,
} from '../../../../../models/interface/params.interface';
import { Transformer } from '../../../../../models/transformer';

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
  /**	Int32	部件分类，用于分辨不同层级和重要度的部件	O	*/
  Category?: number;
  /**	Int32[]	部件状态	O	*/
  ObjectStates?: number[];
  /**	String	升序属性，不区分大小写	O	*/
  Asc?: string;
  /**	String	降序属性，不区分大小写	O	*/
  Desc?: string;
}
export class GetRoadObjectReportParams implements IParams {
  /**	Int32	报表类型，1-周，2-月	M	*/
  StatementType!: number;
  /**	Date	开始时间，周的日期不要填错	M	*/
  @Transform(Transformer.Date)
  BeginDate!: Date;
  /**	Date	结束时间	M	*/
  @Transform(Transformer.Date)
  EndDate!: Date;
  /**	String	区划ID，街道和区级	O	*/
  DivisionId?: string;
}
