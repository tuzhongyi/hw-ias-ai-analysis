import { EventEmitter, Injectable } from '@angular/core';
import { RoadSection } from '../../../../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { MapHelper } from '../../../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../../../common/view-models/value.promise';
import { IASMapAMapRoadController } from '../../../../../../../share/map/controller/amap/road/ias-map-amap-road.controller';
import { SystemModuleRoadSectionDetailsMapAMapCreatorController } from './creator/system-module-road-section-details-map-amap-creator.controller';
import { SystemModuleRoadSectionDetailsMapAMapEditorController } from './editor/system-module-road-section-details-map-amap-editor.controller';
import { SystemModuleRoadSectionDetailsMapAMapLabelController } from './system-module-road-section-details-map-amap-label.controller';
import { SystemModuleRoadSectionDetailsMapAMapPolylineController } from './system-module-road-section-details-map-amap-polyline.controller';

@Injectable()
export class SystemModuleRoadSectionDetailsMapAMapController {
  event = {
    mousemove: new EventEmitter<[number, number]>(),
    mouseout: new EventEmitter<void>(),
    change: new EventEmitter<[number, number][]>(),
    click: new EventEmitter<[number, number]>(),
  };

  creator =
    new PromiseValue<SystemModuleRoadSectionDetailsMapAMapCreatorController>();
  editor =
    new PromiseValue<SystemModuleRoadSectionDetailsMapAMapEditorController>();
  road = new PromiseValue<IASMapAMapRoadController>();
  constructor() {
    MapHelper.amap
      .get(
        'system-module-road-section-details-map',
        [...MapHelper.amap.plugins, 'AMap.PolylineEditor'],
        true
      )
      .then((x) => {
        let container = new Loca.Container({ map: x });
        this.map.set(x);
        this.regist(x);
        let polyline =
          new SystemModuleRoadSectionDetailsMapAMapPolylineController(x);
        this.polyline.set(polyline);
        this.label.set(
          new SystemModuleRoadSectionDetailsMapAMapLabelController(x)
        );
        this.creator.set(
          new SystemModuleRoadSectionDetailsMapAMapCreatorController(x)
        );
        this.editor.set(
          new SystemModuleRoadSectionDetailsMapAMapEditorController(x, polyline)
        );
        let road = new IASMapAMapRoadController(x, container);
        this.road.set(road);
      });
  }

  private map = new PromiseValue<AMap.Map>();
  private polyline =
    new PromiseValue<SystemModuleRoadSectionDetailsMapAMapPolylineController>();
  private label =
    new PromiseValue<SystemModuleRoadSectionDetailsMapAMapLabelController>();

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

  async load(datas: RoadSection[]) {
    let map = await this.map.get();
    let polyline = await this.polyline.get();
    let label = await this.label.get();
    polyline.clear();
    label.clear();

    for (let i = 0; i < datas.length; i++) {
      const item = datas[i];
      if (item.GeoLine) {
        let positions = item.GeoLine.map<[number, number]>((x) => {
          return [x.Longitude, x.Latitude];
        });
        polyline.add(item.Id, positions);
        label.add(item);
      }
    }

    map.setFitView();

    setTimeout(() => {
      map.setFitView();
    }, 1.5 * 1000);
  }
  clear() {
    this.polyline.get().then((polyline) => {
      polyline.clear();
    });
    this.label.get().then((label) => {
      label.clear();
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
