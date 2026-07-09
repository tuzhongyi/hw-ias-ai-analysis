import { AbstractUrl } from '../../../abstract.url';

export class GeographicPatrolSectionUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}Sections`);
  }
}
