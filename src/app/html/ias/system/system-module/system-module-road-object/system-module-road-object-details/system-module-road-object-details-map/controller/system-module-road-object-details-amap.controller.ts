import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { IASMapAMapRoadController } from '../../../../../../share/map/controller/amap/road/ias-map-amap-road.controller';
import { SystemModuleRoadObjectDetailsAMapObjectController } from './object/system-module-road-object-details-amap-object.controller';

export class SystemModuleRoadObjectDetailsAMapController {
  get road() {
    return this.controller.road.get();
  }
  get point() {
    return this.controller.point.get();
  }
  get map() {
    return this.controller.map.get();
  }
  constructor() {
    MapHelper.amap
      .get('system-module-road-object-details-map', [], true, {
        showLabel: false,
        viewMode: '3D',
      })
      .then((map) => {
        map.setFeatures(['bg', 'road', 'building']);
        this.controller.map.set(map);

        let container = new Loca.Container({ map: map });
        this.controller.container.set(container);

        let road = new IASMapAMapRoadController(map, container);
        this.controller.road.set(road);

        let point = new SystemModuleRoadObjectDetailsAMapObjectController(map);
        this.controller.point.set(point);
      });
  }

  private controller = {
    map: new PromiseValue<AMap.Map>(),
    container: new PromiseValue<Loca.Container>(),
    road: new PromiseValue<IASMapAMapRoadController>(),
    point:
      new PromiseValue<SystemModuleRoadObjectDetailsAMapObjectController>(),
  };
}
