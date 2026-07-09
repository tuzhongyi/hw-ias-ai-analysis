import { AbstractUrl } from '../../../abstract.url';

export class GeographicPatrolPlanUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}Plans`);
  }

  capability() {
    return `${this.basic()}/Capability`;
  }

  match() {
    return `${this.basic()}/Match`;
  }
}
