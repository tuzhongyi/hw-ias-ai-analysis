import { EventEmitter } from '@angular/core';
import { ColorTool } from '../../../../../../../../common/tools/color/color.tool';
import { GeoTool } from '../../../../../../../../common/tools/geo-tool/geo.tool';

export class SystemModuleMobileDeviceRouteAMapPathController {
  mouseover = new EventEmitter<[number, number]>();
  mouseout = new EventEmitter<void>();
  click = new EventEmitter<[number, number]>();

  constructor(private map: AMap.Map, private index: number) {}

  private positions?: AMap.Polyline;
  private points: [number, number][] = [];

  private onmouseover(e: any) {
    var point = AMap.GeometryUtil.closestOnLine(
      [e.lnglat.lng, e.lnglat.lat],
      [...this.points]
    ) as unknown as [number, number];
    if (point) {
      let closest = GeoTool.point.closest(this.points, point);
      if (closest) {
        this.mouseover.emit(closest);
      }
    }
  }
  private onmouseout(e: any) {
    this.mouseout.emit();
  }
  private onclick(e: any) {
    var point = AMap.GeometryUtil.closestOnLine(
      [e.lnglat.lng, e.lnglat.lat],
      [...this.points]
    ) as unknown as [number, number];
    let closest = GeoTool.point.closest(this.points, point);
    if (closest) {
      this.click.emit(closest);
    }
  }

  load(positions: [number, number][]): AMap.Polyline | undefined {
    if (positions.length === 0) return;
    this.points = positions;
    if (positions.length > 0) {
      this.map.setCenter(positions[0]);
    }
    this.positions = new AMap.Polyline({
      path: [...positions],
      showDir: true,
      strokeWeight: 6,
      strokeColor:
        this.index == 0 ? '#32b33e' : ColorTool.get.index(this.index - 1),
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
