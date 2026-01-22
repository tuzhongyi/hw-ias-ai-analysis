import { Road } from '../../../../../../common/data-core/models/arm/geographic/road.model';
import { SystemMainMapAMapController } from './amap/system-main-map-amap.controller';

export class SystemMainMapRoadController {
  loaded = false;

  constructor(private amap: SystemMainMapAMapController) {}

  async load(datas: Road[]) {
    let road = await this.amap.road.get();
    road.load(datas);
    this.loaded = true;
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
