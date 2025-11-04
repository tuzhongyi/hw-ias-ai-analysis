import { EventEmitter } from '@angular/core';
import { GeoTool } from '../../../../../../../../common/tools/geo-tool/geo.tool';

export class SystemTaskFileDetailsAMapPathWayController {
  mouseover = new EventEmitter<[number, number]>();
  mouseout = new EventEmitter<void>();
  click = new EventEmitter<[number, number]>();

  constructor(private map: AMap.Map) {}

  private positions?: AMap.Polyline;
  private points: [number, number][] = [];

  private onmouseover(e: any) {
    var point = AMap.GeometryUtil.closestOnLine(
      [e.lnglat.lng, e.lnglat.lat],
      [...this.points]
    ) as [number, number];
    let closest = GeoTool.point.closest(this.points, point);

    if (closest) {
      this.mouseover.emit(closest);
    }
  }
  private onmouseout(e: any) {
    this.mouseout.emit();
  }
  private onclick(e: any) {
    var point = AMap.GeometryUtil.closestOnLine(
      [e.lnglat.lng, e.lnglat.lat],
      [...this.points]
    ) as [number, number];
    let closest = GeoTool.point.closest(this.points, point);
    if (closest) {
      this.click.emit(closest);
    }
  }
  load(positions: [number, number][]) {
    if (this.positions) {
      this.map.remove(this.positions);
    }
    if (positions.length < 2) {
      return;
    }
    this.points = positions;
    this.positions = new AMap.Polyline({
      path: [...positions],
      showDir: true,
      strokeWeight: 6,
      strokeColor: '#4196ff',
      lineJoin: 'round',
      lineCap: 'round',
      cursor: 'pointer',
    });

    this.positions.on('mouseover', (e: any) => {
      this.onmouseover(e);
    });
    this.positions.on('mouseout', (e: any) => {
      this.onmouseout(e);
    });
    this.positions.on('click', (e: any) => {
      this.onclick(e);
    });

    this.map.add(this.positions);
  }
}
