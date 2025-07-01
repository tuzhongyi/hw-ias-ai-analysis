import { AbstractUrl } from '../../../abstract.url';

export class GeographicShopUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Shops`);
  }

  excel(isWGS84: boolean = true) {
    return `${this.basic()}/Excels?IsWGS84=${isWGS84}`;
  }

  task = {
    compare: () => {
      return `${this.basic()}/TaskCompare`;
    },
    detected: {
      result: () => {
        return `${this.basic()}/TaskDetectedResults`;
      },
    },
  };
}
