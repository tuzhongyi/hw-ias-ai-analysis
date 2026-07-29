import { AbstractUrl } from '../../../abstract.url';

export class GeographicRoadObjectStockUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Stocks`);
  }
}
