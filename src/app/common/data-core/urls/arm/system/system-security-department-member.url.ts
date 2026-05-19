import { AbstractUrl } from '../../abstract.url';

export class SystemSecurityDepartmentMemberUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Members`);
  }
}
