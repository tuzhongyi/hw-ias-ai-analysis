export class SystemModuleRoadSectionMapAMapPolylineController {
  constructor(private map: AMap.Map) {}

  private datas: [number, number][] = [];
  private polylines = new Map<string, AMap.Polyline>();
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

  add(id: string, datas: [number, number][]) {
    this.datas = datas;
    let line = this.create(datas);
    this.polylines.set(id, line);
    let lines = Array.from(this.polylines.values());
    this.map.add(lines);
  }
  clear() {
    if (this.datas.length > 0) {
      this.datas = [];
    }
    if (this.polylines.size > 0) {
      let lines = Array.from(this.polylines.values());
      this.map.remove(lines);
      this.polylines.clear();
    }
  }
  select(id: string) {
    this.blur();
    let line = this.polylines.get(id);
    if (line) {
      this.selected = id;
      line.setOptions({
        strokeColor: '#ff6600',
      });
      this.map.setFitView(line);
    }
    return line;
  }
  get(id: string) {
    return this.polylines.get(id);
  }
  blur() {
    if (this.selected) {
      let line = this.polylines.get(this.selected);
      if (line) {
        line.setOptions({
          strokeColor: '#00ee33',
        });
      }
      this.selected = undefined;
    }
  }
}
