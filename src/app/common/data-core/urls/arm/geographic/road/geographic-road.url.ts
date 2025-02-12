import { AbstractUrl } from '../../../abstract.url';

export class GeographicRoadUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Roads`);
  }
}
