import { SystemAMapShopPointAbstract } from './system-map-amap-shop-point.abstract';

export class SystemAMapShopPointCreatedController extends SystemAMapShopPointAbstract {
  constructor(container: Loca.Container) {
    super(container);
  }
  protected style = {
    radius: 5,
    unit: 'px',
    color: 'rgb(35, 227, 83)',
    borderWidth: 0,
    blurWidth: 3,
  };
}
