import { Road } from '../../../../../../common/data-core/models/arm/geographic/road.model';
import { SystemMainMapAMapController } from './amap/system-main-map-amap.controller';

export class SystemMainMapRoadController {
  loaded = false;

  constructor(private amap: SystemMainMapAMapController) {}

  async load(datas: Road[]) {
    let road = await this.amap.road.get();
    // 必须把画出来的折线交出去：调用方要拿它当 setFitView 的目标，
    // 漏了这个 return，focus(undefined) 就变成自适应全部覆盖物
    // （商铺、设备、路段对象…都框进来），而不是只看路网
    let polylines = await road.load(datas);
    this.loaded = true;

    return polylines;
  }
  async clear() {
    let road = await this.amap.road.get();
    road.clear();
    this.loaded = false;
  }
  destory() {
    return this.clear();
  }
}
