export class SystemModuleRoadSectionDetailsMapAMapPolylineController {
  constructor(private map: AMap.Map) {}

  private datas: [number, number][] = [];
  private polyline?: AMap.Polyline;
  private selected: string | undefined;

  private create(datas: [number, number][]): AMap.Polyline {
    const polyline = new AMap.Polyline({
      path: datas,
      strokeColor: '#00ee33',
      strokeWeight: 5,
      strokeOpacity: 0.5,
      // 折线样式还可以为'dashed'
      strokeStyle: 'solid',

      lineJoin: 'round',
      lineCap: 'round',
      bubble: true,
    });
    return polyline;
  }

  add(datas: [number, number][]) {
    this.datas = datas;
    this.polyline = this.create(datas);
    this.map.add(this.polyline);
  }
  clear() {
    if (this.datas.length > 0) {
      this.datas = [];
    }
    if (this.polyline) {
      this.map.remove(this.polyline);
      this.polyline = undefined;
    }
  }

  get() {
    return this.polyline;
  }
}
