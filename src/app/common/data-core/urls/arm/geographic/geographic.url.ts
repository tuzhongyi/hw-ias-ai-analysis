import { BaseUrl } from '../../base.url';
import { GeographicPatrolUrl } from './patrol/geographic-patrol.url';
import { GeographicRoadUrl } from './road/geographic-road.url';
import { GeographicShopUrl } from './shop/geographic-shop.url';

export class ArmGeographicUrl {
  private static get basic() {
    return `${BaseUrl.arm}/Geographic`;
  }

  static get road() {
    return new GeographicRoadUrl(this.basic);
  }

  static get shop() {
    return new GeographicShopUrl(this.basic);
  }

  static get patrol() {
    return new GeographicPatrolUrl(this.basic);
  }
}
