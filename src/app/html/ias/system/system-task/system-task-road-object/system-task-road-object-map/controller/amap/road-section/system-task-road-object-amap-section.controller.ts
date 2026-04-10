import { EventEmitter } from '@angular/core';
import { RoadSection } from '../../../../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { SystemModuleRoadSectionMapAMapPolylineController } from '../../../../../../system-module/system-module-road-section/system-module-road-section-map/controller/amap/system-module-road-section-map-amap-polyline.controller';

export class SystemTaskRoadObjectAMapSectionController {
  event = {
    mousemove: new EventEmitter<[number, number]>(),
    mouseout: new EventEmitter<void>(),
    change: new EventEmitter<[number, number][]>(),
    click: new EventEmitter<[number, number]>(),
  };
  constructor(map: AMap.Map) {
    this.polyline = new SystemModuleRoadSectionMapAMapPolylineController(map);
    this.regist(map);
  }

  private polyline: SystemModuleRoadSectionMapAMapPolylineController;

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
    this.polyline.clear();

    for (let i = 0; i < datas.length; i++) {
      const item = datas[i];
      if (item.GeoLine) {
        let positions = item.GeoLine.map<[number, number]>((x) => {
          return [x.Longitude, x.Latitude];
        });
        this.polyline.add(item.Id, positions);
      }
    }
  }

  select(id: string) {
    this.polyline.select(id);
  }
  blur() {
    this.polyline.blur();
  }

  clear() {
    this.polyline.clear();
  }
}
