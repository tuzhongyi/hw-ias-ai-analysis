import { EventEmitter } from '@angular/core';

export class SystemModuleRoadAreaMapAMapPolygonController {
  /** 点中多边形时把它的 id 报出去 */
  event = {
    click: new EventEmitter<string>(),
  };

  constructor(private map: AMap.Map) {}

  private polygons = new Map<string, AMap.Polygon>();
  private selected: string | undefined;

  private create(id: string, datas: [number, number][]): AMap.Polygon {
    // @amap/amap-jsapi-types 里 Polygon 漏了构造函数声明（Polyline 有），这里绕过
    const polygon = new (AMap.Polygon as any)({
      path: datas,
      strokeColor: '#00ee33',
      strokeWeight: 5,
      strokeOpacity: 0.5,
      // 多边形样式还可以为'dashed'
      strokeStyle: 'solid',
      fillColor: '#00ee33',
      fillOpacity: 0.2,
      bubble: true,
    } satisfies AMap.PolygonOptions);
    polygon.on('click', () => {
      this.event.click.emit(id);
    });
    return polygon;
  }

  add(id: string, datas: [number, number][]) {
    let polygon = this.create(id, datas);
    this.polygons.set(id, polygon);
    this.map.add(Array.from(this.polygons.values()));
  }
  clear() {
    if (this.polygons.size > 0) {
      this.map.remove(Array.from(this.polygons.values()));
      this.polygons.clear();
    }
  }
  select(id: string) {
    this.blur();
    let polygon = this.polygons.get(id);
    if (polygon) {
      this.selected = id;
      polygon.setOptions({
        strokeColor: '#ff6600',
        fillColor: '#ff6600',
      });
      this.map.setFitView(polygon);
    }
    return polygon;
  }
  blur() {
    if (this.selected) {
      let polygon = this.polygons.get(this.selected);
      if (polygon) {
        polygon.setOptions({
          strokeColor: '#00ee33',
          fillColor: '#00ee33',
        });
      }
      this.selected = undefined;
    }
  }
}
