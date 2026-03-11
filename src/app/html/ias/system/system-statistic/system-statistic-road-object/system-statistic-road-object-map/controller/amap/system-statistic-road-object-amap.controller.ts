import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { IASMapAMapRoadController } from '../../../../../../share/map/controller/amap/road/ias-map-amap-road.controller';

export class SystemStatisticRoadObjectAMapController {
  get road() {
    return this.controller.road.get();
  }
  get map() {
    return this.controller.map.get();
  }

  constructor() {
    MapHelper.amap
      .get('system-statistic-road-object-map', [], true, {
        showLabel: false,
        viewMode: '3D',
      })
      .then((map) => {
        map.setFeatures(['bg', 'road', 'building']);

        this.init.map(map);

        let container = this.init.container(map);

        this.init.road(map, container);
      });
  }
  private controller = {
    map: new PromiseValue<AMap.Map>(),
    container: new PromiseValue<Loca.Container>(),
    road: new PromiseValue<IASMapAMapRoadController>(),
  };

  private init = {
    map: (map: AMap.Map) => {
      this.controller.map.set(map);
    },
    container: (map: AMap.Map) => {
      let container = new Loca.Container({ map: map });
      this.controller.container.set(container);
      return container;
    },
    road: (map: AMap.Map, loca: Loca.Container) => {
      let ctr = new IASMapAMapRoadController(map, loca);
      this.controller.road.set(ctr);
    },
  };
}
