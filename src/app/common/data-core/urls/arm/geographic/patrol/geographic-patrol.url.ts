import { AbstractUrl } from '../../../abstract.url';
import { GeographicPatrolPlanUrl } from './geographic-patrol-plan.url';
import { GeographicPatrolSectionUrl } from './geographic-patrol-section.url';

export class GeographicPatrolUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Patrol`);
  }

  get section() {
    return new GeographicPatrolSectionUrl(this.basic());
  }
  get plan() {
    return new GeographicPatrolPlanUrl(this.basic());
  }
}
