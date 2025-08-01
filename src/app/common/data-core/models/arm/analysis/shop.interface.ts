import 'reflect-metadata';
import { ShopObjectState } from '../../../enums/analysis/shop-object-state.enum';
import { IIdNameModel } from '../../model.interface';
import { GisPoints } from '../gis-point.model';

export interface IShop extends IIdNameModel {
  /**	String	商铺ID	M	*/
  Id: string;
  /**	String	商铺名称	M	*/
  Name: string;
  /**	String	分店名称	O	*/
  BranchName?: string;
  /**	String	地址	O	*/
  Address?: string;
  /**	Int32	商铺对象状态	M	*/
  ObjectState: ShopObjectState;
  /**	String	联系方式	O	*/
  Telphone?: string;
  /**	Int32	商铺类型，1-店铺招牌，2-指示牌，3-路牌，4-广告牌，5-宣传标语，10-其他	O */
  ShopType?: number;
  /**	GisPoint	商铺Gis坐标	O	*/
  Location?: GisPoints;
  /**	String	商铺照片	O	*/
  ImageUrl?: string;
  /**	DateTime	创建时间	M	*/
  CreationTime: Date;
  /**	DateTime	更新时间	M	*/
  UpdateTime: Date;
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
  /**	String	单位类型：个体工商户	O	*/
  UnitType?: string;
  /**	String	经营地址	O	*/
  BusinessAddress?: string;
  /**	String	注册地址	O	*/
  RegisteredAddress?: string;
  /**
   * String
   * 所属行业：
   * 其他
   * 房地产业
   * 批发和零售业
   * 超市（便利店）
   * 饭店
   * 广告文印文具
   * O
   **/
  Industry?: string;
  /**	String	企业负责人	O	*/
  PersonInCharge?: string;
  /**	String	联系人	O	*/
  Contract?: string;
  /**	String	联系方式，一般是电话号码	O	*/
  ContractDetails?: string;
  /**	Int32	从业人数	O	*/
  EmployeeNumber?: number;
  /**
   * String
   * 经营范围：
   * 中式快餐
   * 快餐服务
   * 房地产经纪
   * 烟草零售
   * 棋牌服务
   * 医疗用品及器材批发
   * 面包零售
   * 正餐服务
   * 美容美发服务
   * 百货零售
   * 饮料零售
   * 西药零售
   * 正餐服务
   * 小吃服务
   * 机动车维修
   * 动物诊疗
   * 食品零售
   * O
   **/
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

  /**	Double	商铺偏北角朝向	O	*/
  Course?: number;
  /**	String	道路ID	O	*/
  RoadId?: string;
  /**	String	道路名称	O	*/
  RoadName?: string;
  /**	Int64	商铺在上道路序号	O	*/
  RoadOrderNo?: number;

  /**	String	门面道路ID	O */
  OriRoadId?: string;
  /**	String	门面道路名称	O */
  OriRoadName?: string;
  /**	Int64	商铺在门面道路序号	O */
  OriRoadOrderNo?: number;
  /**	Boolean	是否已移除	O */
  Removal?: boolean;
  /**	String	分组GUID，用于中心服务器区分来源	O */
  GroupGuid?: string;
  /**	String	分组名称	O */
  GroupName?: string;
}
