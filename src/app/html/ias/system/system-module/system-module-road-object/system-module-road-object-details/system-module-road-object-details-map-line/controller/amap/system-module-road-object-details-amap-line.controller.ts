import { EventEmitter } from '@angular/core';
import { GisPoint } from '../../../../../../../../../common/data-core/models/arm/gis-point.model';
import { MapHelper } from '../../../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../../../common/view-models/value.promise';
import { IASMapAMapRoadController } from '../../../../../../../share/map/controller/amap/road/ias-map-amap-road.controller';
import { SystemModuleRoadObjectDetailsAMapLineCreatorController } from './creator/system-module-road-section-details-amap-line-creator.controller';
import { SystemModuleRoadObjectDetailsAMapLineEditorController } from './editor/system-module-road-object-details-amap-line-editor.controller';
import { SystemModuleRoadObjectDetailsAMapLinePolylineController } from './system-module-road-object-details-amap-polyline.controller';

export class SystemModuleRoadObjectDetailsAMapLineController {
  event = {
    mousemove: new EventEmitter<[number, number]>(),
    mouseout: new EventEmitter<void>(),
    change: new EventEmitter<[number, number][]>(),
    click: new EventEmitter<[number, number]>(),
  };

  creator =
    new PromiseValue<SystemModuleRoadObjectDetailsAMapLineCreatorController>();
  editor =
    new PromiseValue<SystemModuleRoadObjectDetailsAMapLineEditorController>();
  road = new PromiseValue<IASMapAMapRoadController>();
  constructor() {
    MapHelper.amap
      .get(
        'system-module-road-object-details-map-line',
        [...MapHelper.amap.plugins, 'AMap.PolylineEditor'],
        true
      )
      .then((x) => {
        let container = new Loca.Container({ map: x });
        this.map.set(x);
        this.regist(x);
        let polyline =
          new SystemModuleRoadObjectDetailsAMapLinePolylineController(x);
        this.polyline.set(polyline);

        this.creator.set(
          new SystemModuleRoadObjectDetailsAMapLineCreatorController(x)
        );
        this.editor.set(
          new SystemModuleRoadObjectDetailsAMapLineEditorController(x, polyline)
        );
        let road = new IASMapAMapRoadController(x, container);
        this.road.set(road);
      });
  }

  private map = new PromiseValue<AMap.Map>();
  private polyline =
    new PromiseValue<SystemModuleRoadObjectDetailsAMapLinePolylineController>();

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

  async load(datas: GisPoint[]) {
    let map = await this.map.get();
    let polyline = await this.polyline.get();
    polyline.clear();

    let positions = datas.map<[number, number]>((x) => {
      return [x.Longitude, x.Latitude];
    });
    polyline.add(positions);
    return polyline.get();
  }
  async clear() {
    let ctr = await this.polyline.get();
    ctr.clear();
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
