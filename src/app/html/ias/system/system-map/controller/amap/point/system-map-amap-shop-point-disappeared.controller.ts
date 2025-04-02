import { SystemAMapShopPointAbstract } from './system-map-amap-shop-point.abstract';

export class SystemAMapShopPointDisappearedController extends SystemAMapShopPointAbstract {
  constructor(container: Loca.Container) {
    super(container);
  }
  protected style = {
    radius: 5,
    unit: 'px',
    color: 'rgb(255, 118, 44)',
    borderWidth: 0,
    blurWidth: 3,
  };
}
