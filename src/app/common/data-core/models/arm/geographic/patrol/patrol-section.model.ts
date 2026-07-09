import { Transform, Type } from 'class-transformer';
import { IIdNameModel } from '../../../interface/model.interface';
import { Transformer } from '../../../transformer';
import { GisPoint } from '../../gis-point.model';

/**	PatrolSection (巡逻路段)	*/
export class PatrolSection implements IIdNameModel {
  /**	String	路段ID	M	*/
  Id!: string;
  /**	String	路段名称	M	*/
  Name!: string;
  /**	Int32	路段方向	M	*/
  RoadDirection!: number;
  /**	Double	方向，偏差值，默认：30度	O	*/
  CourseDeviation?: number;
  /**	Double	匹配半径范围，单位：米，0-100米，默认20米	O	*/
  Raduis?: number;
  /**	GisPoint[]	GPS坐标，根据方向优先经过的位置在数组最前面，下标最小。注意设置路段时不要设置到路口，需要留有余量，车辆转弯经常不经过路口。	O	*/
  @Type(() => GisPoint)
  GeoLine?: GisPoint[];
  /**	DateTime	创建时间	M	*/
  @Transform(Transformer.DateTime)
  CreationTime!: Date;
  /**	DateTime	更新时间	M	*/
  @Transform(Transformer.DateTime)
  UpdateTime!: Date;
  /**	String	分组GUID，用于中心服务器区分来源	O	*/
  GroupGuid?: string;
  /**	String	分组名称	O	*/
  GroupName?: string;
  /**	String[]	所属分组列表	O	*/
  GroupGuids?: string[];
  /**	String	描述信息	O	*/
  Description?: string;
  /**	Double	总距离，单位：米，只读会根据GeoLine自动计算。	O	*/
  TotalDistance?: number;
  /**	Double	预计时长，单位：秒，暂时无效	O	*/
  TotalSeconds?: number;
  /**	String	区划ID	O	*/
  DivisionId?: string;
}
