import { AbstractUrl } from '../../../abstract.url';
import { GeographicRoadObjectEventUrl } from './geographic-road-object-event.url';

export class GeographicRoadObjectUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/RoadObjects`);
  }

  capability() {
    return `${this.basic()}/Capability`;
  }

  event() {
    return new GeographicRoadObjectEventUrl(this.basic());
  }
}
