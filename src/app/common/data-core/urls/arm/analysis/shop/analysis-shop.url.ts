import { AbstractUrl } from '../../../abstract.url';
import { AnalysisShopSignUrl } from './analysis-shop-sign.url';

export class AnalysisShopUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Shops`);
  }

  capability() {
    return `${this.basic()}/Capability`;
  }

  create(createToServer?: boolean): string {
    if (createToServer) {
      return `${this.basic()}?CreateToServer=${createToServer}`;
    } else {
      return `${this.basic()}`;
    }
  }
  sign(id?: string) {
    if (id) {
      return new AnalysisShopSignUrl(`${this.item(id)}`);
    }
    return new AnalysisShopSignUrl(this.basic());
  }
}
