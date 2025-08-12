import { Transform } from 'class-transformer';
import { IIdModel } from '../model.interface';
import { Transformer } from '../transformer';

/**	User (用户信息)	*/
export class User implements IIdModel {
  /**	String	全局ID	M	*/
  Id!: string;
  /**	String	用户名	M	*/
  Username!: string;
  /**
   * String
   * 密码，查询时不会出现
   * 密码内容为：SM4加密
   * O
   **/
  Password?: string;
  /**	String	用户描述	O	*/
  Description?: string;
  /**	Int32	分组编号，从1开始。如果为0，则系统自动分配	M	*/
  GroupId!: number;
  /**	String	分组名称	M	*/
  GroupName!: string;
  /**	String[]	支持的权限类型	O	*/
  Priorities?: string[];
  /**	Boolean	是否为Root权限用户	M	*/
  IsRoot!: boolean;
  /**	DateTime	创建时间	O	*/
  @Transform(Transformer.DateTime)
  CreationTime?: Date;
  /**	DateTime	更新时间	O	*/
  @Transform(Transformer.DateTime)
  UpdateTime?: Date;
}
