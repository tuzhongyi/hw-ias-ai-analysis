import { ResultLabelType } from '../../../../enums/analysis/result-label-type.enum';
import { ShopObjectState } from '../../../../enums/analysis/shop-object-state.enum';
import { GisPoint } from '../../../../models/arm/gis-point.model';
import {
  IParams,
  PagedDurationParams,
} from '../../../../models/params.interface';

export class GetShopsParams extends PagedDurationParams {
  /**	String[]	商铺ID列表	O	*/
  Ids?: string[];
  /**	String	商铺名称	O	*/
  Name?: string;
  /**	String	商铺内容描述	O	*/
  Description?: string;
  /**	String	联系方式	O	*/
  Telphone?: string;
  /**	Int32[]	商铺对象状态	O	*/
  ObjectStates?: ShopObjectState[];
  /**	Double	置信度，0-1	O	*/
  Confidence?: number;
  /**	GisPoint	照片Gis坐标	D	*/
  Location?: GisPoint;
  /**	Double	单位：米，必须与Location一起出现	D	*/
  LocationDistance?: number;
  /**	Boolean	是否手动标注的，锁定内容	O	*/
  Locked?: boolean;
  /**	Boolean	屏蔽数据，true：屏蔽	O	*/
  Marking?: boolean;
  /**	Int32[]	性质，保留	O	*/
  Natures?: number[];
  /**	Int32[]	分类，保留	O	*/
  Classifications?: number[];
  /**	Int32[]	商铺类型，1-店铺招牌，2-指示牌，3-路牌，4-广告牌，5-宣传标语，10-其他 */
  ShopTypes?: number[];
  /**	String[]	任务ID过滤	O */
  TaskIds?: string[];
  /**	String[]	机位编号	O */
  CameraNos?: string[];
  /**	Int32[]	标注结果	O */
  ResultLabelTypes?: number[];
  /**	String	升序属性，不区分大小写	O	*/
  Asc?: string;
  /**	String	降序属性，不区分大小写	O	*/
  Desc?: string;
}
export class GetShopSignsParams extends PagedDurationParams {
  /**	String[]	店招ID列表	O	*/
  Ids?: string[];
  /**	String	店招名称	O	*/
  Text?: string;
  /**	String[]	任务ID	O	*/
  TaskIds?: string[];
  /**	Int32[]	店招对象状态	O	*/
  ObjectStates?: number[];
  /**	Double	置信度，0-1	O	*/
  Confidence?: number;
  /**	String[]	商铺ID	O */
  ShopIds?: string[];
  /**	Int32[]	标注结果	O */
  ResultLabelTypes?: number[];
  /**	String[]	机位编号	O */
  CameraNos?: string[];
  /**	Int32[]	招牌类型，1：商铺招牌	O */
  SignTypes?: number[];
  /**	String	升序属性，不区分大小写	O	*/
  Asc?: string;
  /**	String	降序属性，不区分大小写	O	*/
  Desc?: string;
}
export class ResultLabelingParams implements IParams {
  /**	Int32	结果标注类型	M */
  ResultLabelType!: ResultLabelType;
}
