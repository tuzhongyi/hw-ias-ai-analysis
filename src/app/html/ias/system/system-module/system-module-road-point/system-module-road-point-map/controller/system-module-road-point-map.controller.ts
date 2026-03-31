import { Subscription } from 'rxjs';
import { RoadPoint } from '../../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';
import { SystemModuleRoadPointAMapController } from './amap/system-module-road-point-amap.controller';

export class SystemModuleRoadPointMapController {
  constructor(subscription: Subscription) {
    this.amap = new SystemModuleRoadPointAMapController(subscription);
  }
  private amap: SystemModuleRoadPointAMapController;

  road = {
    load: async (datas: Road[]) => {
      let road = await this.amap.road.get();
      road.load(datas);
    },
    clear: async () => {
      let road = await this.amap.road.get();
      road.clear();
    },
  };
  map = {
    focus: async (datas: any, immediately = true) => {
      let map = await this.amap.map.get();
      map.setFitView(datas, immediately);
      let center = map.getCenter();
      return [center.lng, center.lat] as [number, number];
    },
    move: async (position: [number, number], zoom?: number) => {
      let map = await this.amap.map.get();
      map.setCenter(new AMap.LngLat(position[0], position[1]));
      if (zoom) {
        map.setZoom(zoom);
      }
    },
    destroy: async () => {
      await this.road.clear();
      await this.circle.clear();
      let map = await this.amap.map.get();
      map.destroy();
    },
  };
  circle = {
    load: async (datas: RoadPoint[]) => {
      let ctr = await this.amap.circle.get();
      ctr.load(datas);
    },
    clear: async () => {
      let ctr = await this.amap.circle.get();
      ctr.clear();
    },
    select: async (data: RoadPoint) => {
      let ctr = await this.amap.circle.get();
      let selected = ctr.select(data);
      this.map.focus(selected, false);
    },
    blur: async () => {
      let ctr = await this.amap.circle.get();
      ctr.blur();
    },
  };
  scatter = {
    load: async (datas: RoadPoint[]) => {
      let ctr = await this.amap.scatter.get();
      ctr.load(datas);
    },
    clear: async () => {
      let ctr = await this.amap.scatter.get();
      ctr.clear();
    },
    select: async (data: RoadPoint) => {
      let ctr = await this.amap.scatter.get();
      let selected = ctr.select(data);

      let gcj02 = data.Location?.GCJ02;
      let center = [gcj02?.Longitude, gcj02?.Latitude] as [number, number];
      this.map.move(center, 21);
    },
    blur: async () => {
      let ctr = await this.amap.scatter.get();
      ctr.blur();
    },
  };
}
