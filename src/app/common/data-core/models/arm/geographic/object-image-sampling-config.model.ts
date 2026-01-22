import { Transform } from 'class-transformer';
import { IModel } from '../../model.interface';
import { Transformer } from '../../transformer';

/**	ObjectImageSamplingConfig (目标图片采样配置)	*/
export class ObjectImageSamplingConfig implements IModel {
  /**	Boolean	是否启用	M	*/
  Enabled!: boolean;
  /**	Double	目标采样开始距离，单位：米	M	*/
  Distance!: number;
  /**	Double	方向，0-360度，0正北，顺时针	O	*/
  Course!: number;
  /**	Int32	采样方案	M	*/
  SamplePlan!: number;
  /**
   *  Int32
   * 	巡查时间间隔，单位：天
   *  如果为0，表示每次路过都需要巡查。
   * 	M	*/
  InspectionInterval!: number;
  /**	DateTime	下次巡查时间	M	*/
  @Transform(Transformer.DateTime)
  InspectionTime!: Date;
  /**	DateTime	最后一次巡查时间	M	*/
  @Transform(Transformer.DateTime)
  LatestInspectionTime!: Date;
}
