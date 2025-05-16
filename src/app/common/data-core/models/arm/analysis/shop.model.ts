import { Transform, Type } from 'class-transformer';
import 'reflect-metadata';
import { ShopObjectState } from '../../../enums/analysis/shop-object-state.enum';
import { transformDateTime } from '../../transformer';
import { GisPoint } from '../gis-point.model';
import { IShop } from './shop.interface';

/**	Shop (商铺信息)	*/
export class Shop implements IShop {
  /**	String	商铺ID	M	*/
  Id!: string;
  /**	Int64	整数ID	M	*/
  IntId?: number;
  /**	String	商铺名称	M	*/
  Name!: string;
  /**	String[]	候选名称	O	*/
  Texts?: string[];
  /**	String	分店名称	O	*/
  BranchName?: string;
  /**	String	地址	O	*/
  Address?: string;
  /**	Int32	商铺对象状态	M	*/
  ObjectState!: ShopObjectState;
  /**	String	联系方式	O	*/
  Telphone?: string;
  /**	Int32	商铺类型，1-店铺招牌，2-指示牌，3-路牌，4-广告牌，5-宣传标语，10-其他	O */
  ShopType?: number;
  /**	String	关联的注册商铺信息	O */
  RegistrationId?: string;
  /**	Boolean	是否为副或子招牌，true表示是子招牌，null或false表示不是。	O */
  IsSubSignboard?: boolean;
  /**	Int32	营业状态，1：停业，2：营业，3：装修	O */
  BusinessState?: number;
  /**	Double	置信度，0-1	O	*/
  Confidence?: number;
  /**	GisPoint	商铺Gis坐标	O	*/
  @Type(() => GisPoint)
  Location?: GisPoint;
  /**	String	商铺照片	O	*/
  ImageUrl?: string;
  /**	DateTime	第一次出现的时间	M	*/
  @Transform(transformDateTime)
  BeginTime!: Date;
  /**	DateTime	最后一次出现的时间	M	*/
  @Transform(transformDateTime)
  EndTime!: Date;
  /**	DateTime	创建时间	M	*/
  @Transform(transformDateTime)
  CreationTime!: Date;
  /**	DateTime	更新时间	M	*/
  @Transform(transformDateTime)
  UpdateTime!: Date;
  /**	Boolean	是否手动标注的，锁定内容	O	*/
  Locked?: boolean;
  /**	Boolean	屏蔽数据，true：屏蔽	O	*/
  Marking?: boolean;
  /**	Double	加权值	O	*/
  WeightedValue?: number;
  /**	Int32	性质，保留	O	*/
  Nature?: number;
  /**	Int32	分类，保留	O	*/
  Classification?: number;
  /**	Int32	用户分组ID	O	*/
  GroupId?: number;
  /**	String	描述信息	O	*/
  Description?: string;
  /**	String	所属街道	O	*/
  StreetId?: string;
  /**	String	街道名称	O	*/
  StreetName?: string;
  /**	String	所属片区	O	*/
  GridCellId?: string;
  /**	String	所属片区名称	O	*/
  GridCellName?: string;
  /**	String	统一社会信用代码	O	*/
  UscId?: string;
  /**	String	单位名称	O	*/
  UnitName?: string;
  /**	String	载体类型	O	*/
  CarrierType?: string;
  /**	String	入驻载体名称	O	*/
  CarrierName?: string;
  /**	String	单位类型：	O	*/
  UnitType?: string;
  /**	String	经营地址	O	*/
  BusinessAddress?: string;
  /**	String	注册地址	O	*/
  RegisteredAddress?: string;
  /**	String	所属行业：	O	*/
  Industry?: string;
  /**	String	企业负责人	O	*/
  PersonInCharge?: string;
  /**	String	联系人	O	*/
  Contract?: string;
  /**	String	联系方式，一般是电话号码	O	*/
  ContractDetails?: string;
  /**	Int32	从业人数	O	*/
  EmployeeNumber?: number;
  /**	String	经营范围：	O	*/
  BusinessScope?: string;

  /**
   * 	Int32
   * 	商铺相对道路的位置，
   *    1：东面
   *    2：南面
   *    3：西面
   *    4：北面
   * 	O
   */
  ShopSide?: number;
  /**	Double	商铺偏北角朝向	O */
  Course?: number;
  /**	String	道路ID	O */
  RoadId?: string;
  /**	String	道路名称	O */
  RoadName?: string;
  /**	Int64	商铺在上道路序号	O */
  RoadOrderNo?: number;

  TaskIds?: string[];
}
