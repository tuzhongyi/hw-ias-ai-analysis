import { EventEmitter } from '@angular/core';
import { MapTool } from '../../../../../common/tools/map-tool/map.tool';

declare var AMap: any;

export class SystemTaskFileDetailsAMapPathController {
  mouseover = new EventEmitter<number[]>();
  mouseout = new EventEmitter<void>();
  click = new EventEmitter<number[]>();

  constructor(private map: any) {}

  private positions?: any;
  private points: number[][] = [];

  private onmouseover(e: any) {
    var point = AMap.GeometryUtil.closestOnLine(
      [e.lnglat.lng, e.lnglat.lat],
      [...this.points]
    );
    let closest = MapTool.closest(this.points, point);
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
    );
    let closest = MapTool.closest(this.points, point);
    if (closest) {
      this.click.emit(closest);
    }
  }

  load(positions: number[][]) {
    if (positions.length === 0) return;
    this.points = positions;
    if (positions.length > 0) {
      this.map.setCenter(positions[0]);
    }
    this.positions = new AMap.Polyline({
      path: [...positions],
      showDir: true,
      strokeWeight: 6,
      strokeColor: '#32b33e',
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
    this.map.setFitView(null, true);
  }
}
