import { AbstractUrl } from '../../../abstract.url';

export class GeographicRoadPointUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/RoadPoints`);
  }

  capability() {
    return `${this.basic()}/Capability`;
  }
}
