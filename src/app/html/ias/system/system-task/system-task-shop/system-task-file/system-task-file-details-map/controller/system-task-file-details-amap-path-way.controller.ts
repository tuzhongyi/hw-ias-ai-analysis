import { EventEmitter } from '@angular/core';
import {
  GeoLine,
  GeoPoint,
} from '../../../../../../../../common/tools/geo-tool/geo.model';
import { GeoTool } from '../../../../../../../../common/tools/geo-tool/geo.tool';

export class SystemTaskFileDetailsAMapPathWayController {
  mouseover = new EventEmitter<{
    line: GeoLine;
    point: GeoPoint;
    percent: number;
  }>();
  mouseout = new EventEmitter<void>();
  click = new EventEmitter<{
    line: GeoLine;
    point: GeoPoint;
    percent: number;
  }>();

  constructor(private map: AMap.Map) {}

  private positions?: AMap.Polyline;
  private points: [number, number][] = [];
  private hover = false;

  private onmouseover(e: any) {
    this.hover = true;
    this.onmove(e);
  }

  private onmove(e: any) {
    var point = AMap.GeometryUtil.closestOnLine(
      [e.lnglat.lng, e.lnglat.lat],
      [...this.points]
    ) as [number, number];

    if (point) {
      let closest = GeoTool.polyline.closest.get(this.points, point);
      if (closest) {
        this.mouseover.emit({
          point: point,
          line: closest.line,
          percent: closest.percent.segment,
        });
      }
    }
  }
  private onmouseout(e: any) {
    this.hover = false;
    this.mouseout.emit();
  }
  private onclick(e: any) {
    var point = AMap.GeometryUtil.closestOnLine(
      [e.lnglat.lng, e.lnglat.lat],
      [...this.points]
    ) as [number, number];

    if (point) {
      let closest = GeoTool.polyline.closest.get(this.points, point);
      if (closest) {
        this.click.emit({
          point: point,
          line: closest.line,
          percent: closest.percent.segment,
        });
      }
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
    this.positions.on('mousemove', (e: any) => {
      if (this.hover) {
        this.onmove(e);
      }
    });
    this.positions.on('click', (e: any) => {
      this.onclick(e);
    });

    this.map.add(this.positions);
  }
}
