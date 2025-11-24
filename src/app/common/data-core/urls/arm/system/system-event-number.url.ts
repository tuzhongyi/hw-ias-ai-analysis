import { AbstractUrl } from '../../abstract.url';

export class SystemEventNumberUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Numbers`);
  }

  statistic() {
    return `${this.basic()}/Statistics`;
  }
}
