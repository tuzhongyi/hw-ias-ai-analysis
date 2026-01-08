import { AbstractUrl } from '../../../abstract.url';

export class GeographicRoadSectionUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/RoadSections`);
  }

  capability() {
    return `${this.basic()}/Capability`;
  }
}
