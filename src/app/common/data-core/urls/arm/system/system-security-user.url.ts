import { AbstractUrl } from '../../abstract.url';

export class SystemSecurityUserUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Users`);
  }

  get group() {
    return new SystemSecurityUserGroupUrl(this.basic());
  }
}
export class SystemSecurityUserGroupUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Groups`);
  }
}
