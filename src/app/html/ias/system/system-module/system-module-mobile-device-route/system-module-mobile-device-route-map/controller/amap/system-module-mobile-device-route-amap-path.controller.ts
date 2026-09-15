import { EventEmitter } from '@angular/core';
import {
  GeoLine,
  GeoPoint,
} from '../../../../../../../../common/tools/geo-tool/geo.model';
import { GeoTool } from '../../../../../../../../common/tools/geo-tool/geo.tool';
import { IASMapAMapConfig } from '../../../../../../share/map/controller/amap/ias-map-amap.config';

export class SystemModuleMobileDeviceRouteAMapPathController {
  mouseover = new EventEmitter<{
    line: GeoLine;
    point: GeoPoint;
    percent: number;
  }>();
  mousemove = new EventEmitter<{
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

  constructor(
    private map: AMap.Map,
    private index: number,
  ) {}

  private positions?: AMap.Polyline;
  private points: [number, number][] = [];
  private hover = false;

  private onmouseover(e: any) {
    this.hover = true;
    let data = this.closest(e);
    if (data) {
      this.mouseover.emit(data);
    }
  }
  private onmousemove(e: any) {
    if (this.hover) {
      let data = this.closest(e);
      if (data) {
        this.mousemove.emit(data);
      }
    }
  }
  private onmouseout(e: any) {
    this.hover = false;
    this.mouseout.emit();
  }
  private closest(
    e: any,
  ): { line: GeoLine; point: GeoPoint; percent: number } | undefined {
    var point = AMap.GeometryUtil.closestOnLine(
      [e.lnglat.lng, e.lnglat.lat],
      [...this.points],
    ) as [number, number];
    if (point) {
      let closest = GeoTool.polyline.closest.get(this.points, point);
      if (closest) {
        return {
          point: point,
          line: closest.line,
          percent: closest.percent.segment,
        };
      }
    }
    return undefined;
  }
  private onclick(e: any) {
    let data = this.closest(e);
    if (data) {
      this.click.emit(data);
    }
  }

  load(positions: [number, number][]): AMap.Polyline | undefined {
    if (positions.length === 0) return;
    this.points = positions;
    this.positions = new AMap.Polyline({
      path: [...positions],
      showDir: true,
      strokeWeight: 6,
      strokeColor: IASMapAMapConfig.path.color[this.index],
      strokeOpacity: 0.6,
      lineJoin: 'round',
      lineCap: 'round',
      cursor: 'pointer',
    });
    this.positions.on('mouseover', (e: any) => {
      this.onmouseover(e);
    });
    this.positions.on('mousemove', (e: any) => {
      this.onmousemove(e);
    });
    this.positions.on('mouseout', (e: any) => {
      this.onmouseout(e);
    });
    this.positions.on('click', (e: any) => {
      this.onclick(e);
    });

    // for (let i = 0; i < positions.length; i++) {
    //   const item = positions[i];
    //   let marker = new AMap.Marker({
    //     position: item,
    //     label: {
    //       content: `${i}`,
    //       offset: new AMap.Pixel(0, 10),
    //       direction: 'top',
    //     },
    //   });
    //   this.map.add(marker);
    // }

    this.map.add(this.positions);
    return this.positions;
  }

  clear() {
    if (this.positions) {
      this.map.remove(this.positions);
      this.positions = undefined;
    }
    this.points = [];
  }
}
