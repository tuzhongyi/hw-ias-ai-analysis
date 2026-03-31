import { AbstractUrl } from '../../../abstract.url';
import { GeographicRoadObjectUrl } from './geographic-road-object.url';
import { GeographicRoadPointUrl } from './geographic-road-point.url';
import { GeographicRoadSectionUrl } from './geographic-road-section.url';

export class GeographicRoadUrl extends AbstractUrl {
  constructor(private base: string) {
    super(`${base}/Roads`);
  }

  get section() {
    return new GeographicRoadSectionUrl(this.base);
  }
  get object() {
    return new GeographicRoadObjectUrl(this.base);
  }
  get point() {
    return new GeographicRoadPointUrl(this.base);
  }

  address() {
    return `${this.basic()}/Address`;
  }
}
