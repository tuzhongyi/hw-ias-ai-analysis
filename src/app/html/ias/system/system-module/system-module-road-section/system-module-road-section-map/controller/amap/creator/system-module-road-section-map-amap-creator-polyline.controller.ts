export class SystemModuleRoadSectionMapAMapCreatorPolylineController {
  constructor(private map: AMap.Map) {}

  private polyline?: AMap.Polyline;

  private create(path: [number, number][]) {
    // 创建折线实例
    this.polyline = new AMap.Polyline({
      path: path,
      strokeColor: '#FF0000',
      strokeWeight: 3,
      strokeOpacity: 1,
      // 折线样式还可以为'dashed'
      strokeStyle: 'solid',
      // 边线样式
      lineJoin: 'round',
      lineCap: 'round',
      bubble: true,
      zIndex: 9,
    });

    // 将折线添加至地图实例
    this.map.add(this.polyline);
  }

  set(path: [number, number][]) {
    if (this.polyline) {
      this.polyline.setPath(path);
    } else {
      this.create(path);
    }
  }

  clear() {
    if (this.polyline) {
      this.map.remove(this.polyline);
      this.polyline = undefined;
    }
  }
}
