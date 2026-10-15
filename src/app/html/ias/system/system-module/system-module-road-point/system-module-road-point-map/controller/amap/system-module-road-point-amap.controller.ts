import { Subscription } from 'rxjs';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { IASMapAMapRoadController } from '../../../../../../share/map/controller/amap/road/ias-map-amap-road.controller';
import { LastResortTool } from '../../../../../../../../common/tools/last-resort-tool/last-resort.tool';
import { SystemModuleRoadPointAMapCircleLayerController } from './circle/system-module-road-point-amap-circle-layer.controller';
import { SystemModuleRoadPointAMapScatterLayerController } from './scatter/system-module-road-point-amap-scatter-layer.controller';

export class SystemModuleRoadPointAMapController {
  map = new PromiseValue<AMap.Map>();
  circle = new PromiseValue<SystemModuleRoadPointAMapCircleLayerController>();
  scatter = new PromiseValue<SystemModuleRoadPointAMapScatterLayerController>();
  road = new PromiseValue<IASMapAMapRoadController>();

  private last = new LastResortTool();

  /** 视野已被数据接管 → 取消城市兜底 */
  claim() {
    this.last.claim();
  }

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
        x.setZoom(17);

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

  city(value: string) {
    this.last.fallback(() => {
      this.map.get().then((x) => {
        // 等地图的这些时间里，可能已经有别的数据接管了视野
        if (this.last.claimed) return;
        x.setCity(value, () => {
          x.setZoom(17);
        });
      });
    });
  }
}
