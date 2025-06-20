import { EventEmitter } from '@angular/core';
import { GeoTool } from '../../../../../../../../../common/tools/geo-tool/geo.tool';
import { SystemTaskRouteMapAMapPathCurrentController } from './system-task-route-map-amap-path-current.controller';
import { SystemTaskRouteMapAMapPathTerminalController } from './system-task-route-map-amap-path-terminal.controller';

export class SystemTaskRouteMapAMapPathController {
  mouseover = new EventEmitter<[number, number]>();
  mousemove = new EventEmitter<[number, number]>();
  mouseout = new EventEmitter<void>();
  click = new EventEmitter<[number, number]>();
  dblclick = new EventEmitter<[number, number]>();

  constructor(private map: AMap.Map) {
    this.terminal = new SystemTaskRouteMapAMapPathTerminalController(map);
    this.current = new SystemTaskRouteMapAMapPathCurrentController(map);
  }

  private positions?: AMap.Polyline;
  private points: [number, number][] = [];
  private terminal: SystemTaskRouteMapAMapPathTerminalController;
  private current: SystemTaskRouteMapAMapPathCurrentController;

  private on = {
    mouse: {
      over: (e: any) => {
        let closest = this.closest(e);
        if (closest) {
          this.current.show(closest);
          this.mouseover.emit(closest);
        }
      },
      out: (e: any) => {
        this.current.hide();
        this.mouseout.emit();
      },
      move: (e: any) => {
        let closest = this.closest(e);
        if (closest) {
          this.current.show(closest);
          this.mousemove.emit(closest);
        }
      },
    },
    click: (e: any) => {
      let closest = this.closest(e);
      if (closest) {
        this.click.emit(closest);
      }
    },
    dblclick: (e: any) => {
      let closest = this.closest(e);
      if (closest) {
        this.dblclick.emit(closest);
      }
    },
  };

  private closest(e: any) {
    var point = AMap.GeometryUtil.closestOnLine(
      [e.lnglat.lng, e.lnglat.lat],
      [...this.points]
    ) as [number, number];
    return GeoTool.point.closest(this.points, point);
  }
  load(positions: [number, number][]) {
    if (positions.length === 0) return;
    this.points = positions;
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
      this.on.mouse.over(e);
    });
    this.positions.on('mouseout', (e: any) => {
      this.on.mouse.out(e);
    });
    this.positions.on('mousemove', (e: any) => {
      this.on.mouse.move(e);
    });
    this.positions.on('click', (e: any) => {
      this.on.click(e);
    });
    this.positions.on('dblclick', (e: any) => {
      this.on.dblclick(e);
    });

    this.map.add(this.positions);
    if (positions.length > 1) {
      this.terminal.load(positions[0], positions[positions.length - 1]);
    }
  }
}
