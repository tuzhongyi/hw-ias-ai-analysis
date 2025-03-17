import { SystemAMapShopPointAbstract } from './system-map-amap-shop-point.abstract';

export class SystemAMapShopPointDisappearedController extends SystemAMapShopPointAbstract {
  constructor(container: Loca.Container) {
    super(container);
  }
  protected style = {
    radius: 5,
    unit: 'px',
    color: '#f8433c',
    borderWidth: 0,
    blurWidth: 3,
  };
}
