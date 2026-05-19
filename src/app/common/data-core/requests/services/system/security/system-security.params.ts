import { PagedParams } from '../../../../models/interface/params.interface';

export class GetDepartmentsParams extends PagedParams {
  /**	String[]	部件ID列表	O	*/
  Ids?: string[];
  /**	String	名称，支持LIKE	O	*/
  Name?: string;
  /**	String[]	分组GUID	O	*/
  GroupGuids?: string[];
  /**	String	升序属性，不区分大小写	O	*/
  Asc?: string;
  /**	String	降序属性，不区分大小写	O	*/
  Desc?: string;
}
export class GetDepartmentMembersParams extends PagedParams {
  /**	String[]	部件成员ID列表	O	*/
  Ids?: string[];
  /**	String	名称或手机号码，支持LIKE	O	*/
  NameOrMobileNo?: string;
  /**	String[]	部门ID列表	O	*/
  DepartmentIds?: string[];
  /**	String	升序属性，不区分大小写	O	*/
  Asc?: string;
  /**	String	降序属性，不区分大小写	O	*/
  Desc?: string;
}
