import { Transform } from 'class-transformer';
import { IModel } from '../../model.interface';
import { transformDateTime } from '../../transformer';

/**	Assignment (事件派单信息)	*/
export class Assignment implements IModel {
  /**	DateTime	派单时间	O	*/
  @Transform(transformDateTime)
  AssignmentTime?: Date;
  /**	Boolean	是否已派单，true：已派单	M	*/
  Assigned!: boolean;
  /**	Boolean	是否已处置，true：已处置	M	*/
  Handled!: boolean;
  /**	String	处置人员名称	O	*/
  Handler?: string;
  /**	DateTime	处置时间	O	*/
  @Transform(transformDateTime)
  HandledTime?: Date;
  /**	String[]	处置图片地址	O	*/
  HandledImageUrls?: string[];
  /**	Boolean	是否为误报，true：误报，标记误报的事件Handled会被处置为true。	O	*/
  IsMisInfo?: boolean;
  /**	String	处置描述	O */
  HandleDescription?: string;
  /**	String	店招关联描述	O */
  AssociationDescription?: string;
  /**	Int32	店招关联方式，1：误报，2：消失，3：停业或装修，4：恢复营业，5：新增屏蔽，6：子招牌合并	O */
  AssociationType?: number;
}
