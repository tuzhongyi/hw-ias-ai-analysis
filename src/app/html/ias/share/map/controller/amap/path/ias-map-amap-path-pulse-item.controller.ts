import { EventEmitter } from '@angular/core';
import {
  GeoLine,
  GeoPoint,
  GeoPolyline,
} from '../../../../../../../common/tools/geo-tool/geo.model';
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';

export class IASMapAMapPathPulseItemController {
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

  constructor(private map: AMap.Map, private container: Loca.Container) {}

  private polyline = new Loca.PulseLineLayer({
    opacity: 0.8,
    visible: true,
    zooms: [0, 50],
    zIndex: 100,
  });
  public points: [number, number][] = [];
  public datas: GeoPolyline[] = [];
  private hover = false;

  private onmouseover(e: any) {
    this.hover = true;
    this.onmove(e);
  }
  private onmouseout(e: any) {
    this.hover = false;
    this.mouseout.emit();
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

  load(lines: GeoPolyline) {
    if (lines.length === 0) return;
    this.points = lines;

    let total = GeoTool.polyline.length(lines);

    let json: any = GeoTool.polyline.convert.json([lines]);

    let geo = new Loca.GeoJSONSource({ data: json });

    this.polyline.setSource(geo);
    this.polyline.setStyle({
      altitude: 0,
      lineWidth: 4,
      // 脉冲头颜色
      headColor: 'rgba(255, 255, 255, 1)',
      // 脉冲尾颜色
      trailColor: 'rgba(0, 0, 0, 0)',
      // 脉冲长度，0.25 表示一段脉冲占整条路的 1/4
      interval: 1,
      // 脉冲线的速度，几秒钟跑完整段路
      duration: total,
    });
    this.polyline.setLoca(this.container);
    this.container.animate.start();
  }

  clear() {
    if (this.polyline) {
      this.polyline.remove();
      this.points = [];
    }
  }
}
