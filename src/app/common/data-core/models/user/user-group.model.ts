import { IModel } from '../model.interface'

/**	UserGroup (用户分组信息)	*/
export class UserGroup implements IModel {
  /**	Int32	分组编号，从1开始	M	*/
  GroupId!: number
  /**	String	分组名称	M	*/
  GroupName!: string
}
