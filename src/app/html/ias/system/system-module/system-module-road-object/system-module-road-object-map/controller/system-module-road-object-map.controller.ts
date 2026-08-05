import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { IRoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.interface';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';
import { IASMapAMapConfig } from '../../../../../share/map/controller/amap/ias-map-amap.config';
import { SystemModuleRoadObjectAMapController } from './amap/system-module-road-object-amap.controller';

export class SystemModuleRoadObjectMapController<
  TRoadObject extends IRoadObject<any> = RoadObject,
> {
  constructor(container: HTMLDivElement, subscription: Subscription) {
    this.amap = new SystemModuleRoadObjectAMapController<TRoadObject>(
      container,
      subscription,
    );
    this.regist(subscription);
  }
  private amap: SystemModuleRoadObjectAMapController<TRoadObject>;
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
      click: new EventEmitter<TRoadObject>(),
      dblclick: new EventEmitter<TRoadObject>(),
    },
    load: (datas: TRoadObject[]) => {
      let lines = datas.filter((x) => x.IsGeoLine && !!(x as any).GeoLine);
      let points = datas.filter((x) => !x.IsGeoLine || !(x as any).GeoLine);

      this.amap.roadobject.polyline.then((x) => {
        x.load(lines as any);
      });

      this.amap.roadobject.point.then((x) => {
        x.load(points as any);
      });
      return this.amap.roadobject.marker.then((x) => {
        return x.load(points as any);
      });
    },
    clear: async () => {
      let marker = await this.amap.roadobject.marker;
      marker.clear();
      let point = await this.amap.roadobject.point;
      point.clear();
    },
    select: async (data: TRoadObject) => {
      let marker = await this.amap.roadobject.marker;
      marker.select(data as any);
    },
    over: async (data: TRoadObject) => {
      let zoom = IASMapAMapConfig.icon.zooms[0];

      let map = await this.amap.map;
      let current = map.getZoom();
      if (current >= zoom) {
        let marker = await this.amap.roadobject.marker;
        marker.mouseover(data as any);
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
    out: async (data: TRoadObject) => {
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
          map.setZoomAndCenter(
            zoom,
            new AMap.LngLat(position[0], position[1]),
            true,
            500,
          );
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
