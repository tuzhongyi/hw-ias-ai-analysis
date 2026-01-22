import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';
import { SystemModuleRoadObjectAMapController } from './amap/system-module-road-object-amap.controller';

export class SystemModuleRoadObjectMapController {
  constructor(subscription: Subscription) {
    this.amap = new SystemModuleRoadObjectAMapController(subscription);
    this.regist(subscription);
  }
  private amap: SystemModuleRoadObjectAMapController;
  private regist(subscription: Subscription) {
    this.amap.roadobject.marker.then((marker) => {
      let sub1 = marker.event.click.subscribe((x) => {
        this.object.event.click.emit(x);
      });
      subscription.add(sub1);
      let sub2 = marker.event.dblclick.subscribe((x) => {
        this.object.event.dblclick.emit(x);
      });
      subscription.add(sub2);
    });
  }

  object = {
    event: {
      click: new EventEmitter<RoadObject>(),
      dblclick: new EventEmitter<RoadObject>(),
    },
    load: (datas: RoadObject[]) => {
      this.amap.roadobject.marker.then((x) => {
        x.load(datas);
      });
      this.amap.roadobject.point.then((x) => {
        x.load(datas);
      });
    },
    clear: async () => {
      let marker = await this.amap.roadobject.marker;
      marker.clear();
      let point = await this.amap.roadobject.point;
      point.clear();
    },
    select: async (data: RoadObject) => {
      let marker = await this.amap.roadobject.marker;
      marker.select(data);
    },
    over: async (data: RoadObject) => {
      let marker = await this.amap.roadobject.marker;
      marker.mouseover(data);
    },
    out: async (data: RoadObject) => {
      let marker = await this.amap.roadobject.marker;
      marker.mouseout(data);
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
