import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';
import { SystemStatisticRoadObjectAMapController } from './amap/system-statistic-road-object-amap.controller';

export class SystemStatisticRoadObjectMapController {
  amap = new SystemStatisticRoadObjectAMapController();

  road = {
    load: async (datas: Road[]) => {
      let road = await this.amap.road;
      road.load(datas);
    },
    clear: async () => {
      let road = await this.amap.road;
      road.clear();
    },
  };

  map = {
    focus: async (datas: any) => {
      let map = await this.amap.map;
      map.setFitView(datas, true);
      map.setZoom(17);
      let center = map.getCenter();
      return [center.lng, center.lat] as [number, number];
    },
    move: (position: [number, number], zoom?: number) => {
      this.amap.map.then((map) => {
        map.setCenter(new AMap.LngLat(position[0], position[1]));
        if (zoom) {
          map.setZoom(zoom);
        }
      });
    },
    destroy: async () => {
      await this.road.clear();
    },
  };
}
