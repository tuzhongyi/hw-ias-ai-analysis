import { AbstractUrl } from '../../abstract.url';

export class SystemEventUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Events`);
  }
  handle(id: string) {
    return `${this.item(id)}/Handle`;
  }
  misinfo(id: string) {
    return `${this.item(id)}/Misinfo`;
  }
  assgin(id: string) {
    return `${this.item(id)}/Assgin`;
  }
  capability() {
    return `${this.basic()}/Capability`;
  }
}
