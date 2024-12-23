import { AbstractUrl } from '../../abstract.url'

export class SystemSecurityUserUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Users`)
  }

  group() {
    return `${this.basic()}/Groups`
  }
}
