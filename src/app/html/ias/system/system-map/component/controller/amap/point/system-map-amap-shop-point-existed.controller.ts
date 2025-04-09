import { SystemAMapShopPointAbstract } from './system-map-amap-shop-point.abstract';

export class SystemAMapShopPointExistedController extends SystemAMapShopPointAbstract {
  constructor(container: Loca.Container) {
    super(container);
  }
  protected style = {
    radius: 5,
    unit: 'px',
    color: 'rgb(30, 144, 255)',
    borderWidth: 0,
    blurWidth: 3,
  };
}
