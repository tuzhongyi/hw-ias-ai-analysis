import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { SystemMapAMapConfig } from '../system-map-amap.config';
import { SystemMapAMapConverter } from '../system-map-amap.converter';

export abstract class SystemAMapShopPointAbstract {
  protected abstract style: {
    radius: number;
    unit: string;
    color: string;
    borderWidth: number;
    blurWidth: number;
  };
  constructor(private container: Loca.Container) {
    this.layer = this.init();
  }
  private converter = new SystemMapAMapConverter();
  private layer: Loca.PointLayer;

  private init() {
    let layer = new Loca.PointLayer({
      blend: 'normal',
      zooms: SystemMapAMapConfig.point.zooms,
    });
    return layer;
  }

  load(datas: IShop[]) {
    let geo = this.converter.geo.point(datas);
    this.layer.setSource(geo);
    this.layer.setStyle(this.style);
    this.container.add(this.layer);
  }

  clear() {
    this.container.clear();
  }

  moving(position: [number, number]) {
    let point = this.layer.queryFeature(position);
    if (point) {
      console.log(point);
    }
  }
}
