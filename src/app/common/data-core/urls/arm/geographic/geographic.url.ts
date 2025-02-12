import { BaseUrl } from '../../base.url';
import { GeographicRoadUrl } from './road/geographic-road.url';

export class ArmGeographicUrl {
  private static get basic() {
    return `${BaseUrl.arm}/Geographic`;
  }

  static get road() {
    return new GeographicRoadUrl(this.basic);
  }
}
