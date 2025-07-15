import { GisPoint } from '../../../../models/arm/gis-point.model';
import { IParams, PagedParams } from '../../../../models/params.interface';

export class GetShopRegistrationsParams extends PagedParams {
  /**	String[]	商铺ID列表	O	*/
  Ids?: string[];
  /**	String	商铺名称，子招牌名称，地址LIKE	O	*/
  Name?: string;
  /**	String	商铺内容描述	O	*/
  Description?: string;
  /**	String	联系方式	O	*/
  Telphone?: string;
  /**	Int32[]	商铺对象状态	O	*/
  ObjectStates?: number[];
  /**	GisPoint	照片Gis坐标	D	*/
  Location?: GisPoint;
  /**	Double	单位：米，必须与Location一起出现	D	*/
  LocationDistance?: number;
  /**	Int32[]	性质，保留	O	*/
  Natures?: number[];
  /**	Int32[]	分类，保留	O	*/
  Classifications?: number[];
  /**	String[]	道路ID	O	*/
  RoadIds?: string[];
  /**	String[]	门面道路ID	O	*/
  OriRoadIds?: string[];
  /**	Int32	用户分组ID	O	*/
  GroupId?: number;
  /**	String	分组GUID，用于中心服务器区分来源	O	*/
  GroupGuid?: string;
  /**	Int32[]	营业状态，1：停业，2：营业，3：装修	O	*/
  BusinessStates?: number[];
  /**	Int32	关联的商铺数量，大于等于的数量。	O	*/
  AssociatedCount?: number;
  /**	Boolean	是否已移除，默认：false	O	*/
  Removal?: boolean;
  /**	Int32[]	AI标签	O	*/
  AILabels?: number[];
  /**	String	任务ID，用于检测某次任务中应该识别的注册商铺集合	O	*/
  TaskId?: string;
  /**	String	升序属性，不区分大小写	O	*/
  Asc?: string;
  /**	String	降序属性，不区分大小写	O	*/
  Desc?: string;
}

export class ShopTaskCompareParams implements IParams {
  /**	String[]	比对任务ID列表	M	*/
  TaskIds!: string[];
  /**	Double	名称相似度阈值0-1，默认0.5	O	*/
  Ratio?: number;
  /**	Double	GPS相差距离，单位：米，默认：100米	O	*/
  Distance?: number;
}
export class GetShopRegistrationTaskDetectedResultParams extends PagedParams {
  /**	String[]	比对任务ID列表	M	*/
  TaskIds!: string[];
  /**	Boolean	是否识别到，true：识别到的，false：未识别的。	O	*/
  Detected?: boolean;
  /**
   * Boolean
   * 是否过滤掉任务线路未经过的注册商铺，默认：false。
   * 注意：过滤是前后会怎加10-15米的误差范围，防止漏掉
   * O
   **/
  RouteFilterEnabled?: boolean;
  /**	String	升序属性，不区分大小写	O	*/
  Asc?: string;
  /**	String	降序属性，不区分大小写	O	*/
  Desc?: string;
}
