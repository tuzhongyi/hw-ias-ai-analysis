export class SystemModuleRoadAreaDetailsMapAMapCreatorPolygonController {
  constructor(private map: AMap.Map) {}

  private polygon?: AMap.Polygon;

  private create(path: [number, number][]) {
    // 创建多边形实例
    // @amap/amap-jsapi-types 里 Polygon 漏了构造函数声明（Polyline 有），这里绕过
    let polygon = new (AMap.Polygon as any)({
      path: path,
      strokeColor: '#FF0000',
      strokeWeight: 3,
      strokeOpacity: 1,
      // 多边形样式还可以为'dashed'
      strokeStyle: 'solid',
      // 面状样式
      fillColor: '#FF0000',
      fillOpacity: 0.2,
      bubble: true,
      zIndex: 9,
    } satisfies AMap.PolygonOptions);
    this.polygon = polygon;

    // 将多边形添加至地图实例
    this.map.add(polygon);
  }

  set(path: [number, number][]) {
    if (this.polygon) {
      this.polygon.setPath(path);
    } else {
      this.create(path);
    }
  }

  clear() {
    if (this.polygon) {
      this.map.remove(this.polygon);
      this.polygon = undefined;
    }
  }
}
