import { Transform } from 'class-transformer';
import { ArmDivisionType } from '../../../enums/division/divison-type.enum';
import { IIdNameModel } from '../../model.interface';
import { Transformer } from '../../transformer';

/**	Division (区划)	*/
export class Division implements IIdNameModel {
  /**	String	区划ID	M	*/
  Id!: string;
  /**	String	区划名称	M	*/
  Name!: string;
  /**	String	父区划ID，如果是根区域节点，则该ID为空	O	*/
  ParentId?: string;
  /**	Boolean	是否为叶节点的区域	M	*/
  IsLeaf!: boolean;
  /**	String	描述信息	O	*/
  Description?: string;
  /**	Int32	区划类型，用于图标区分	M	*/
  DivisionType!: ArmDivisionType;
  /**	DateTime	创建时间	O	*/
  @Transform(Transformer.DateTime)
  CreateTime?: Date;
  /**	DateTime	更新事件	O	*/
  @Transform(Transformer.DateTime)
  UpdateTime?: Date;
}
