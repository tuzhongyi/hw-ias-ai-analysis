import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';
import { IASMapAMapConfig } from '../../../../../share/map/controller/amap/ias-map-amap.config';
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
      let lines = datas.filter((x) => x.IsGeoLine && !!x.GeoLine);
      let points = datas.filter((x) => !x.IsGeoLine || !x.GeoLine);

      this.amap.roadobject.polyline.then((x) => {
        x.load(lines);
        // this.amap.map.then((map) => {
        //   x.test(map, lines);
        // });
      });
      this.amap.roadobject.marker.then((x) => {
        x.load(points);
      });
      this.amap.roadobject.point.then((x) => {
        x.load(points);
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
      let zoom = IASMapAMapConfig.icon.zooms[0];

      let map = await this.amap.map;
      let current = map.getZoom();
      if (current >= zoom) {
        let marker = await this.amap.roadobject.marker;
        marker.mouseover(data);
      } else {
        let point = await this.amap.roadobject.point;
        let gcj02 = data.Location.GCJ02;
        let position = [gcj02.Longitude, gcj02.Latitude] as [number, number];
        let pixel = map.lngLatToContainer(position);
        if (pixel) {
          point.moving([pixel.x, pixel.y]);
        }
      }
    },
    out: async (data: RoadObject) => {
      let marker = await this.amap.roadobject.marker;
      marker.mouseout(data);
    },
  };

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
