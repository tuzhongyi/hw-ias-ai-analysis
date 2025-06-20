import { Transform } from 'class-transformer';
import { IModel } from '../../../model.interface';
import { transformDateTime } from '../../../transformer';

/**	TaskRoadRoute (任务的道路线路)	*/
export class TaskRoadRoute implements IModel {
  /**	String	道路ID	M	*/
  RoadId!: string;
  /**	String	道路名称	M	*/
  RoadName!: string;
  /**	Int64	商铺在上道路序号（距离1/100米）	M	*/
  BeginRoadOrderNo!: number;
  /**	Int64	商铺在上道路序号	M	*/
  EndRoadOrderNo!: number;
  /**	DateTime	开始时间	M	*/
  @Transform(transformDateTime)
  BeginTime!: Date;
  /**	DateTime	结束时间	M	*/
  @Transform(transformDateTime)
  EndTime!: Date;
  /**	Int64	商铺在上道路序号	M	*/
  MinRoadOrderNo!: number;
  /**	Int64	商铺在上道路序号	M	*/
  MaxRoadOrderNo!: number;
  /**	Int64	总长度，1/100米	M	*/
  TotalLength!: number;
  /**	Boolean	行驶方向，true:正向，false逆向。正向为西向东，南向北。	M	*/
  Forward!: boolean;
}
