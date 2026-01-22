import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Road } from '../../../../../../../../common/data-core/models/arm/geographic/road.model';
import { SystemModuleRoadObjectDetailsAMapController } from './system-module-road-object-details-amap.controller';

export class SystemModuleRoadObjectDetailsMapController {
  event = {
    position: new EventEmitter<[number, number]>(),
  };
  constructor(private subscription: Subscription) {
    this.amap = new SystemModuleRoadObjectDetailsAMapController();
    this.regist();
  }

  private amap: SystemModuleRoadObjectDetailsAMapController;

  private regist() {
    this.amap.point.then((point) => {
      let sub = point.event.dragend.subscribe((x) => {
        this.event.position.emit(x);
      });
      this.subscription.add(sub);
    });
  }

  object = {
    load: async (type: number, position: [number, number]) => {
      let point = await this.amap.point;
      point.add(position, type);
    },
    set: {
      position: async (position: [number, number]) => {
        let point = await this.amap.point;
        point.set.position(position);
      },
      type: async (type: number) => {
        let point = await this.amap.point;
        point.set.type(type);
      },
    },
    clear: async () => {
      let point = await this.amap.point;
      point.clear();
    },
  };

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
    move: (position: [number, number]) => {
      this.amap.map.then((map) => {
        map.setCenter(new AMap.LngLat(position[0], position[1]));
      });
    },
    destroy: async () => {
      await this.object.clear();
      await this.road.clear();
    },
  };
}
