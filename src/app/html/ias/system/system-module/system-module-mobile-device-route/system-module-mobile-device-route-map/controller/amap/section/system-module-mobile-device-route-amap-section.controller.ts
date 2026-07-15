import { PatrolSection } from '../../../../../../../../../common/data-core/models/arm/geographic/patrol/patrol-section.model';
import { SystemModuleMobileDeviceRouteAMapSectionPolylineController } from './system-module-mobile-device-route-amap-section-polyline.controller';

export class SystemModuleMobileDeviceRouteAMapSectionController {
  constructor(map: AMap.Map) {
    this.polyline =
      new SystemModuleMobileDeviceRouteAMapSectionPolylineController(map);
  }

  private polyline: SystemModuleMobileDeviceRouteAMapSectionPolylineController;
  private generation = 0;

  async load(datas: PatrolSection[], showDir = true) {
    let generation = ++this.generation;

    if (generation !== this.generation) return;

    this.polyline.clear();

    let lines: AMap.Polyline[] = [];
    for (let i = 0; i < datas.length; i++) {
      const item = datas[i];
      if (item.GeoLine) {
        let positions = item.GeoLine.map<[number, number]>((x) => {
          return [x.Longitude, x.Latitude];
        });
        let line = this.polyline.add(item.Id, positions, showDir);
        lines.push(...line);
      }
    }
    return lines;
  }
  select(id: string) {
    this.polyline.select(id);
  }
  blur() {
    this.polyline.blur();
  }
  hover(id: string) {
    this.polyline.highlight(id);
  }
  blurHover() {
    this.polyline.unhighlight();
  }
  showDir(value: boolean) {
    this.polyline.showDir(value);
  }
  clear() {
    this.polyline.clear();
  }
}
