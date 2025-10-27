import { Type } from 'class-transformer';
import { IIdNameModel } from '../../../model.interface';
import { HowellPoint } from '../../point.model';

/**	SceneLabel (场景目标标签)	*/
export class SceneLabel implements IIdNameModel<number> {
  /**	Int64	标签ID	M	*/
  Id!: number;
  /**	String	标签名称	M	*/
  Name!: string;
  /**	Point[]	多边形在图片上的归一化坐标	M	*/
  @Type(() => HowellPoint)
  Polygon!: HowellPoint[];
  /**	Int32	标签类型，1-区域，2-目标	O	*/
  LabelType?: number;
}
