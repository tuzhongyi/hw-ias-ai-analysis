import { Transform } from 'class-transformer';
import { IIdNameModel } from '../../interface/model.interface';
import { Transformer } from '../../transformer';

/**	DepartmentMember (部门成员信息)	*/
export class DepartmentMember implements IIdNameModel {
  /**	String	成员唯一ID	M	*/
  Id!: string;
  /**	String	姓名	M	*/
  Name!: string;
  /**	String	描述信息	O	*/
  Description?: string;
  /**	String	手机号码，唯一	M	*/
  MobileNo!: string;
  /**	String[]	所属的部门	M	*/
  DepartmentIds!: string[];
  /**	String	微信唯一ID	O	*/
  WeChatOpenId?: string;
  /**	DateTime	创建时间	M	*/
  @Transform(Transformer.DateTime)
  CreationTime!: Date;
  /**	DateTime	更新时间	M	*/
  @Transform(Transformer.DateTime)
  UpdateTime!: Date;
}
