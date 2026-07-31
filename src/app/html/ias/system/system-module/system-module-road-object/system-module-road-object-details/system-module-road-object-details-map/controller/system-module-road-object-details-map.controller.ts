import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoadObjectState } from '../../../../../../../../common/data-core/enums/road/road-object/road-object-state.enum';
import { RoadObjectType } from '../../../../../../../../common/data-core/enums/road/road-object/road-object-type.enum';
import { Road } from '../../../../../../../../common/data-core/models/arm/geographic/road.model';
import { SystemModuleRoadObjectDetailsAMapController } from './system-module-road-object-details-amap.controller';

export class SystemModuleRoadObjectDetailsMapController {
  event = {
    position: new EventEmitter<[number, number]>(),
    dblclick: new EventEmitter<[number, number]>(),
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
    this.amap.map.then((map) => {
      map.setStatus({ doubleClickZoom: false });
      map.on('dblclick', (e: any) => {
        this.event.dblclick.emit([e.lnglat.lng, e.lnglat.lat]);
      });
    });
  }

  object = {
    load: async (position: [number, number], type?: number) => {
      let point = await this.amap.point;
      point.clear();
      point.add(position, type);
    },
    set: {
      position: async (position: [number, number]) => {
        let point = await this.amap.point;
        point.set.position(position);
      },
      type: async (type: RoadObjectType | undefined) => {
        let point = await this.amap.point;
        point.set.type(type);
      },
      state: async (state: RoadObjectState) => {
        let point = await this.amap.point;
        point.set.state(state);
      },
    },
    clear: async () => {
      let point = await this.amap.point;
      point.clear();
    },
  };
  // geocoder = {
  //   address: async (position: [number, number]) => {
  //     let geocoder = await this.amap.geocoder;
  //     return geocoder.get(position);
  //   },
  // };

  road = {
    load: async (datas: Road[]) => {
      let road = await this.amap.road;
      return road.load(datas);
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
      map.setZoom(17, true);
      let center = map.getCenter();
      return [center.lng, center.lat] as [number, number];
    },
    move: (position: [number, number]) => {
      this.amap.map.then((map) => {
        map.setCenter(new AMap.LngLat(position[0], position[1]), true);
      });
    },
    destroy: async () => {
      await this.object.clear();
      await this.road.clear();
      let map = await this.amap.map;
      map.destroy();

      this.amap.destroy();
    },
  };
}
