import { AbstractUrl } from '../../../abstract.url';

export class AnalysisServerTaskShopUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Shops`);
  }

  statistic() {
    return `${this.basic()}/Statistic`;
  }
}
