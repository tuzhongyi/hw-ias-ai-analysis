import { Type } from 'class-transformer';
import { IIdNameModel } from '../../../interface/model.interface';
import { GisPointMatchResult } from './gis-point-match-result.model';

/**	PatrolSectionMatchResult (巡逻路段匹配)	*/
export class PatrolSectionMatchResult implements IIdNameModel {
  /**	String	路段ID	M	*/
  Id!: string;
  /**	String	路段名称	M	*/
  Name!: string;
  /**	Int32	路段方向	M	*/
  RoadDirection!: number;
  /**	GisPointMatchResult[]	GPS坐标，根据方向优先经过的位置在数组最前面，下标最小。注意设置路段时不要设置到路口，需要留有余量，车辆转弯经常不经过路口。	O	*/
  @Type(() => GisPointMatchResult)
  GeoLine?: GisPointMatchResult[];
  /**	String	描述信息	O	*/
  Description?: string;
  /**	Double	总距离，单位：米，只读会根据GeoLine自动计算。	O	*/
  TotalDistance?: number;
  /**	Double	预计时长，单位：秒，暂时无效	O	*/
  TotalSeconds?: number;
  /**	Double	行驶覆盖率，0-100	O	*/
  CoveragePercent?: number;
}
