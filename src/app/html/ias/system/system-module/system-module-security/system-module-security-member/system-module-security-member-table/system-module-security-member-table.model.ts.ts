import { Department } from '../../../../../../../common/data-core/models/arm/security/department.model';
import { ObjectTool } from '../../../../../../../common/tools/object-tool/object.tool';

export interface ISystemModuleSecurityMemberTableArgs {
  name?: string;
  department?: Department;
}
export class SystemModuleSecurityMemberTableArgs
  implements ISystemModuleSecurityMemberTableArgs
{
  name?: string;
  department?: Department;
  first?: boolean;
}
export class SystemModuleSecurityMemberTableFilter
  implements ISystemModuleSecurityMemberTableArgs
{
  name?: string;
  department?: Department;
  asc?: string;
  desc?: string;

  static from(data: SystemModuleSecurityMemberTableArgs) {
    let filter = ObjectTool.assign(data, SystemModuleSecurityMemberTableFilter);
    return filter;
  }
}
