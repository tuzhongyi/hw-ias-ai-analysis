import { Subscription } from 'rxjs';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { IASMapAMapRoadController } from '../../../../../../share/map/controller/amap/road/ias-map-amap-road.controller';
import { SystemModuleRoadPointAMapCircleLayerController } from './circle/system-module-road-point-amap-circle-layer.controller';
import { SystemModuleRoadPointAMapScatterLayerController } from './scatter/system-module-road-point-amap-scatter-layer.controller';

export class SystemModuleRoadPointAMapController {
  map = new PromiseValue<AMap.Map>();
  circle = new PromiseValue<SystemModuleRoadPointAMapCircleLayerController>();
  scatter = new PromiseValue<SystemModuleRoadPointAMapScatterLayerController>();
  road = new PromiseValue<IASMapAMapRoadController>();

  constructor(private subscription: Subscription) {
    MapHelper.amap
      .get(
        'system-module-road-point-map',
        ['AMap.CircleEditor', 'AMap.Adaptor'],
        true,
        { pitch: 40, viewMode: '3D' }
      )
      .then((x) => {
        x.setFeatures(['bg', 'road', 'building']);

        let container = this.init.map(x);
        this.init.road(x, container);
        this.init.circle(x);
        this.init.scatter(container);
      });
  }

  private init = {
    map: (map: AMap.Map) => {
      this.map.set(map);
      let container = new Loca.Container({ map: map });
      return container;
    },
    road: (map: AMap.Map, loca: Loca.Container) => {
      let ctr = new IASMapAMapRoadController(map, loca);
      this.road.set(ctr);
    },
    circle: (map: AMap.Map) => {
      let ctr = new SystemModuleRoadPointAMapCircleLayerController(map);
      this.circle.set(ctr);
    },
    scatter: (loca: Loca.Container) => {
      let ctr = new SystemModuleRoadPointAMapScatterLayerController(loca);
      this.scatter.set(ctr);
    },
  };
}
