import { Injectable } from '@angular/core';
import { IASMapAMapConfig } from '../ias-map-amap.config';

@Injectable()
export class IASMapAMapRoadPolylineController {
  constructor(private map: AMap.Map) {}

  private polylines = new Map<string, AMap.Polyline>();
  private selected?: string;
  private create(datas: [number, number][]): AMap.Polyline {
    const polyline = new AMap.Polyline({
      path: datas,
      strokeColor: IASMapAMapConfig.road.color.normal,
      strokeWeight: 5,
      strokeOpacity: 0.5,
      // 折线样式还可以为'dashed'
      strokeStyle: 'solid',

      lineJoin: 'round',
      lineCap: 'round',
      bubble: false,
    });
    return polyline;
  }

  add(id: string, datas: [number, number][]) {
    let line = this.create(datas);
    this.polylines.set(id, line);
    let lines = Array.from(this.polylines.values());
    this.map.add(lines);
    return lines;
  }
  clear() {
    if (this.polylines.size > 0) {
      let lines = Array.from(this.polylines.values());
      this.map.remove(lines);
      this.polylines.clear();
    }
  }
  select(id: string) {
    this.blur();
    let line = this.get(id);
    if (line) {
      this.selected = id;
      line.setOptions({
        strokeColor: IASMapAMapConfig.road.color.selected,
        strokeOpacity: 0.8,
      });
    }
    return line;
  }
  blur() {
    if (this.selected) {
      let line = this.polylines.get(this.selected);
      if (line) {
        line.setOptions({
          strokeColor: IASMapAMapConfig.road.color.normal,
          strokeOpacity: 0.5,
        });
      }
      this.selected = undefined;
    }
  }
  get(id: string) {
    return this.polylines.get(id);
  }
  focus(id: string) {
    let line = this.get(id);
    if (line) {
      this.map.setFitView(line);
    }
  }
  ignore(ids: string[]) {
    this.polylines.forEach((line, id) => {
      if (ids.includes(id)) {
        line.setOptions({
          strokeOpacity: 0.5,
        });
      } else {
        line.setOptions({
          strokeOpacity: 0.2,
        });
      }
    });
  }
}
