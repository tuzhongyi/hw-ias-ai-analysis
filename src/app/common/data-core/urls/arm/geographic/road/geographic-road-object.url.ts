import { AbstractUrl } from '../../../abstract.url';

export class GeographicRoadObjectUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/RoadObjects`);
  }

  capability() {
    return `${this.basic()}/Capability`;
  }
}
