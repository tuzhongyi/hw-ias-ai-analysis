export class SystemModuleRoadAreaDetailsMapAMapPolygonController {
  constructor(private map: AMap.Map) {}

  private polygon?: AMap.Polygon;

  private create(datas: [number, number][]) {
    // @amap/amap-jsapi-types 里 Polygon 漏了构造函数声明（Polyline 有），这里绕过
    let polygon = new (AMap.Polygon as any)({
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
    this.polygon = polygon;
    this.map.add(polygon);
  }

  add(datas: [number, number][]) {
    if (this.polygon) {
      this.polygon.setPath(datas);
    } else {
      this.create(datas);
    }
  }
  clear() {
    if (this.polygon) {
      this.map.remove(this.polygon);
      this.polygon = undefined;
    }
  }

  get() {
    return this.polygon;
  }
}
