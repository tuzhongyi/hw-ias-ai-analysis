import { AbstractUrl } from '../../../abstract.url';

export class GeographicShopUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Shops`);
  }

  excel() {
    return `${this.basic()}/Excel`;
  }

  task = {
    compare: () => {
      return `${this.basic()}/TaskCompare`;
    },
  };
}
