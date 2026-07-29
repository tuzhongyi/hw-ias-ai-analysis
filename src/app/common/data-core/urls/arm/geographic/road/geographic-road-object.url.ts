import { AbstractUrl } from '../../../abstract.url';
import { GeographicRoadObjectEventUrl } from './geographic-road-object-event.url';
import { GeographicRoadObjectStockUrl } from './geographic-road-object-stock.url';

export class GeographicRoadObjectUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/RoadObjects`);
  }

  capability() {
    return `${this.basic()}/Capability`;
  }

  statements() {
    return `${this.basic()}/Statements`;
  }

  event() {
    return new GeographicRoadObjectEventUrl(this.basic());
  }

  stock() {
    return new GeographicRoadObjectStockUrl(this.basic());
  }
}
