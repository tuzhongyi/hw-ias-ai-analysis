import { AbstractUrl } from '../../../abstract.url';

export class GeographicRoadObjectEventUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Events`);
  }

  confirmed(id: string) {
    return `${this.item(id)}/Confirmed`;
  }
}
