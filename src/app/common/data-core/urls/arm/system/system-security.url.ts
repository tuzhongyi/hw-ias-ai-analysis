import { AbstractUrl } from '../../abstract.url';
import { SystemSecurityDepartmentUrl } from './system-security-department.url';
import { SystemSecurityUserUrl } from './system-security-user.url';

export class SystemSecurityUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Security`);
  }

  authentication() {
    return `${this.basic()}/Authentication`;
  }
  capability() {
    return `${this.basic()}/Capability`;
  }

  login() {
    return `${this.basic()}/Login`;
  }

  get user() {
    return new SystemSecurityUserUrl(this.basic());
  }
  get department() {
    return new SystemSecurityDepartmentUrl(this.basic());
  }
}
