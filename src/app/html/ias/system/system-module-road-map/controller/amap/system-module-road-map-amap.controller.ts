import '@amap/amap-jsapi-types';
import { EventEmitter, Injectable } from '@angular/core';
import { Road } from '../../../../../../common/data-core/models/arm/analysis/road.model';
import { MapHelper } from '../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../common/view-models/value.promise';
import { SystemModuleRoadMapAMapCreatorController } from './creator/system-module-road-map-amap-creator.controller';
import { SystemModuleRoadMapAMapEditorController } from './editor/system-module-road-map-amap-editor.controller';
import { SystemModuleRoadMapAMapLabelController } from './system-module-road-map-amap-label.controller';
import { SystemModuleRoadMapAMapPolylineController } from './system-module-road-map-amap-polyline.controller';

@Injectable()
export class SystemModuleRoadMapAMapController {
  mousemove = new EventEmitter<[number, number]>();
  mouseout = new EventEmitter<void>();

  creator = new PromiseValue<SystemModuleRoadMapAMapCreatorController>();
  editor = new PromiseValue<SystemModuleRoadMapAMapEditorController>();

  constructor() {
    MapHelper.amap
      .get('map-container', [...MapHelper.amap.plugins, 'AMap.PolylineEditor'])
      .then((x) => {
        this.map.set(x);
        this.regist(x);
        this.init(x);
        let polyline = new SystemModuleRoadMapAMapPolylineController(x);
        this.polyline.set(polyline);
        this.label.set(new SystemModuleRoadMapAMapLabelController(x));
        this.creator.set(new SystemModuleRoadMapAMapCreatorController(x));
        this.editor.set(
          new SystemModuleRoadMapAMapEditorController(x, polyline)
        );
      });
  }

  private map = new PromiseValue<AMap.Map>();
  private polyline =
    new PromiseValue<SystemModuleRoadMapAMapPolylineController>();
  private label = new PromiseValue<SystemModuleRoadMapAMapLabelController>();

  private init(map: AMap.Map) {
    console.log(map.getFeatures());
  }

  private regist(map: AMap.Map) {
    map.on('mousemove', (e) => {
      this.mousemove.emit([e.lnglat.lng, e.lnglat.lat]);
    });
    map.on('mouseout', () => {
      this.mouseout.emit();
    });
  }

  async load(datas: Road[]) {
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
  focus() {
    this.map.get().then((map) => {
      map.setFitView();
    });
  }
}
