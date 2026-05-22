import { Injectable } from '@angular/core';
import { SystemModuleSecurityDepartmentManagerBusiness } from '../system-module-security-department/system-module-security-department-manager/system-module-security-department-manager.business';
import { SystemModuleSecurityMemberManagerBusiness } from '../system-module-security-member/system-module-security-member-manager/system-module-security-member-manager.business';

@Injectable()
export class SystemModuleSecurityManagerBusiness {
  constructor(
    public department: SystemModuleSecurityDepartmentManagerBusiness,
    public member: SystemModuleSecurityMemberManagerBusiness
  ) {}
}
