import { SystemModuleSecurityDepartmentWindow } from '../system-module-security-department/system-module-security-department.window';
import { SystemModuleSecurityMemberWindow } from '../system-module-security-member/system-module-security-member.window';

export class SystemModuleSecurityManagerWindow {
  department = new SystemModuleSecurityDepartmentWindow();
  member = new SystemModuleSecurityMemberWindow();
}
