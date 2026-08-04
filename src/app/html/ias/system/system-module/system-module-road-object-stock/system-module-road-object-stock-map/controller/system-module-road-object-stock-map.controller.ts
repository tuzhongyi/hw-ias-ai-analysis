import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoadObjectStock } from '../../../../../../../common/data-core/models/arm/geographic/road-object-stock.model';
import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';
import { IASMapAMapConfig } from '../../../../../share/map/controller/amap/ias-map-amap.config';
import { SystemModuleRoadObjectStockAMapController } from './amap/system-module-road-object-stock-amap.controller';

export class SystemModuleRoadObjectStockMapController {
  constructor(subscription: Subscription) {
    this.amap = new SystemModuleRoadObjectStockAMapController(subscription);
    this.regist(subscription);
  }
  private amap: SystemModuleRoadObjectStockAMapController;
  private regist(subscription: Subscription) {
    let sub1 = this.amap.event.road.object.click.subscribe((x) => {
      this.object.event.click.emit(x);
    });
    subscription.add(sub1);

    let sub2 = this.amap.event.road.object.dblclick.subscribe((x) => {
      this.object.event.dblclick.emit(x);
    });
    subscription.add(sub2);
  }

  object = {
    event: {
      click: new EventEmitter<RoadObjectStock>(),
      dblclick: new EventEmitter<RoadObjectStock>(),
    },
    load: (datas: RoadObjectStock[]) => {
      let lines = datas.filter((x) => x.IsGeoLine && x.GeoLine && x.GeoLine.length > 0);
      let points = datas.filter((x) => !x.IsGeoLine || !x.GeoLine);

      this.amap.roadobject.polyline.then((x) => {
        x.load(lines as any);
      });
      this.amap.roadobject.marker.then((x) => {
        x.load(points as any);
      });
    },
    clear: async () => {
      let marker = await this.amap.roadobject.marker;
      marker.clear();
      let polyline = await this.amap.roadobject.polyline;
      polyline.clear();
    },
    select: async (data: RoadObjectStock) => {
      let marker = await this.amap.roadobject.marker;
      marker.select(data as any);
    },
    over: async (data: RoadObjectStock) => {
      let zoom = IASMapAMapConfig.icon.zooms[0];

      let map = await this.amap.map;
      let current = map.getZoom();
      if (current >= zoom) {
        let marker = await this.amap.roadobject.marker;
        marker.mouseover(data as any);
      }
    },
    out: async (data: RoadObjectStock) => {
      let marker = await this.amap.roadobject.marker;
      marker.mouseout(data as any);
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
        if (zoom) {
          map.setZoomAndCenter(zoom, new AMap.LngLat(position[0], position[1]), true, 500);
        } else {
          map.panTo(new AMap.LngLat(position[0], position[1]), 500);
        }
      });
    },
    destroy: async () => {
      await this.road.clear();
    },
  };
}
