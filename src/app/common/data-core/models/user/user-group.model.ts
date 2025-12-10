import { IModel } from '../model.interface';

/**	UserGroup (用户分组信息)	*/
export class UserGroup implements IModel {
  /**	Int32	分组编号，从1开始	M	*/
  GroupId!: number;
  /**	String	分组名称	M	*/
  GroupName!: string;
  /**	String	分组GUID，用于中心服务器区分来源	O	R */
  GroupGuid?: string;
  /**	String[]	用户区划列表	O	RW */
  DivisionIds?: string[];
  /**	String[]	子分组列表	O	R */
  GroupGuids?: string[];
}
