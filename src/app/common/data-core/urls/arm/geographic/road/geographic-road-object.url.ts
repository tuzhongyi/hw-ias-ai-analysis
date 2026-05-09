import { AbstractUrl } from '../../../abstract.url';
import { GeographicRoadObjectEventUrl } from './geographic-road-object-event.url';

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
}
