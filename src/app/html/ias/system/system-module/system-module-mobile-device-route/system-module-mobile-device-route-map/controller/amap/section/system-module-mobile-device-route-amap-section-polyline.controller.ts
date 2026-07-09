export class SystemModuleMobileDeviceRouteAMapSectionPolylineController {
  constructor(private map: AMap.Map) {}

  private polylines = new Map<string, AMap.Polyline>();

  private create(datas: [number, number][]): AMap.Polyline {
    const polyline = new AMap.Polyline({
      path: datas,
      strokeColor: '#1e90ff',
      strokeWeight: 5,
      strokeOpacity: 0.5,
      strokeStyle: 'solid',
      lineJoin: 'round',
      lineCap: 'round',
      bubble: true,
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

  blur() {
    if (this.selected) {
      let line = this.polylines.get(this.selected);
      if (line) {
        line.setOptions({
          strokeColor: '#1e90ff',
        });
      }
      this.selected = undefined;
    }
  }

  highlight(id: string) {
    this.unhighlight();
    let line = this.polylines.get(id);
    if (line) {
      this.highlighted = id;
      line.setOptions({ strokeOpacity: 1 });
    }
  }

  unhighlight() {
    if (this.highlighted) {
      let line = this.polylines.get(this.highlighted);
      if (line) {
        line.setOptions({ strokeOpacity: 0.5 });
      }
      this.highlighted = undefined;
    }
  }

  clear() {
    this.selected = undefined;
    this.highlighted = undefined;
    if (this.polylines.size > 0) {
      let lines = Array.from(this.polylines.values());
      this.map.remove(lines);
      this.polylines.clear();
    }
  }

  private selected?: string;
  private highlighted?: string;
}
