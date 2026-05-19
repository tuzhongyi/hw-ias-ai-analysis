import { AbstractUrl } from '../../abstract.url';
import { SystemSecurityDepartmentMemberUrl } from './system-security-department-member.url';

export class SystemSecurityDepartmentUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Departments`);
  }

  get member() {
    return new SystemSecurityDepartmentMemberUrl(this.basic());
  }
}
