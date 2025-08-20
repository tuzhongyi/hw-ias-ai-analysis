import { Road } from '../../../../../../common/data-core/models/arm/geographic/road.model';
import { SystemMainMapAMapController } from './amap/system-main-map-amap.controller';

export class SystemMainMapRoadController {
  constructor(private amap: SystemMainMapAMapController) {}
  load(datas: Road[]) {
    return this.amap.road.get().then((x) => {
      return x.load(datas);
    });
  }
}
