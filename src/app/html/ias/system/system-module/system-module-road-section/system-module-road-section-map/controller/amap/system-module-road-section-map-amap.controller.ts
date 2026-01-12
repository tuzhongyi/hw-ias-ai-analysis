import { EventEmitter, Injectable } from '@angular/core';
import { Road } from '../../../../../../../../common/data-core/models/arm/geographic/road.model';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { IASMapAMapRoadController } from '../../../../../../share/map/controller/amap/road/ias-map-amap-road.controller';

import { SystemModuleRoadSectionMapAMapPolylineController } from './system-module-road-section-map-amap-polyline.controller';

@Injectable()
export class SystemModuleRoadSectionMapAMapController {
  event = {
    mousemove: new EventEmitter<[number, number]>(),
    mouseout: new EventEmitter<void>(),
    change: new EventEmitter<[number, number][]>(),
    click: new EventEmitter<[number, number]>(),
  };

  road = new PromiseValue<IASMapAMapRoadController>();
  constructor() {
    MapHelper.amap
      .get('system-module-road-section-map', undefined, true)
      .then((x) => {
        let container = new Loca.Container({ map: x });
        this.map.set(x);
        this.regist(x);
        let polyline = new SystemModuleRoadSectionMapAMapPolylineController(x);
        this.polyline.set(polyline);

        let road = new IASMapAMapRoadController(x, container);
        this.road.set(road);
      });
  }

  private map = new PromiseValue<AMap.Map>();
  private polyline =
    new PromiseValue<SystemModuleRoadSectionMapAMapPolylineController>();

  private regist(map: AMap.Map) {
    map.on('mousemove', (e) => {
      this.event.mousemove.emit([e.lnglat.lng, e.lnglat.lat]);
    });
    map.on('mouseout', () => {
      this.event.mouseout.emit();
    });
    map.on('click', (e) => {
      this.event.click.emit([e.lnglat.lng, e.lnglat.lat]);
    });
  }

  async load(datas: Road[]) {
    let map = await this.map.get();
    let polyline = await this.polyline.get();

    polyline.clear();

    for (let i = 0; i < datas.length; i++) {
      const item = datas[i];
      if (item.GeoLine) {
        let positions = item.GeoLine.map<[number, number]>((x) => {
          return [x.Longitude, x.Latitude];
        });
        polyline.add(item.Id, positions);
      }
    }

    map.setFitView();

    setTimeout(() => {
      map.setFitView();
    }, 1.5 * 1000);
  }
  clear() {
    this.road.get().then((x) => {
      x.clear();
    });
  }

  select(id: string) {
    this.polyline.get().then((polyline) => {
      polyline.select(id);
    });
  }
  blur() {
    this.polyline.get().then((polyline) => {
      polyline.blur();
    });
  }
  focus(datas?: any) {
    this.map.get().then((x) => {
      x.setFitView(datas, true);
      let center = x.getCenter();

      x.setZoom(17);
      x.setPitch(40);
      x.setCenter(center);
    });
  }
  destroy() {
    this.map.get().then((x) => {
      x.destroy();
      this.map.clear();
    });
  }
}
