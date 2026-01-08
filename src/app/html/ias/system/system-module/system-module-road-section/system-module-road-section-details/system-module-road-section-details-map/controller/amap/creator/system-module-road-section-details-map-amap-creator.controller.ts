import { EventEmitter } from '@angular/core';
import { SystemModuleRoadSectionDetailsMapAMapCreatorCircleController } from './system-module-road-section-details-map-amap-creator-circle.controller';
import { SystemModuleRoadSectionDetailsMapAMapCreatorPolylineController } from './system-module-road-section-details-map-amap-creator-polyline.controller';

export class SystemModuleRoadSectionDetailsMapAMapCreatorController {
  create = new EventEmitter<[number, number][]>();

  constructor(private map: AMap.Map) {
    this.polyline =
      new SystemModuleRoadSectionDetailsMapAMapCreatorPolylineController(map);
    this.circle =
      new SystemModuleRoadSectionDetailsMapAMapCreatorCircleController(map);

    this.handle = {
      mousemove: this.mousemove.bind(this),
      click: {
        left: this.click.left.bind(this),
        right: this.click.right.bind(this),
      },
    };
    this.circle.remove.subscribe((x) => {
      this.remove(x);
    });
  }

  private polyline: SystemModuleRoadSectionDetailsMapAMapCreatorPolylineController;
  private circle: SystemModuleRoadSectionDetailsMapAMapCreatorCircleController;
  private drawing = false;
  private path: [number, number][] = [];

  private handle: {
    mousemove: (e: any) => void;
    click: {
      left: (e: any) => void;
      right: (e: any) => void;
    };
  };

  open() {
    this.drawing = true;
    this.path = [];
    // 正确添加事件监听
    this.map.on('mousemove', this.handle.mousemove);
    this.map.on('click', this.handle.click.left);
    this.map.on('rightclick', this.handle.click.right);
  }

  close() {
    // 修复linter错误，正确移除事件监听
    this.drawing = false;
    this.map.off('mousemove', this.handle.mousemove);
    this.map.off('click', this.handle.click.left);
    this.map.off('rightclick', this.handle.click.right);
  }

  clear() {
    this.path = [];
    this.polyline.clear();
    this.circle.clear();
  }

  private remove(position: [number, number]) {
    let index = this.path.findIndex(
      (x) => x[0] === position[0] && x[1] === position[1]
    );
    if (index > -1) {
      this.path.splice(index, 1);
      this.polyline.set(this.path);
    }
  }

  private mousemove(e: any) {
    if (!this.drawing) return;
    const lnglat: [number, number] = [e.lnglat.lng, e.lnglat.lat];
    this.polyline.set([...this.path, lnglat]);
  }
  private click = {
    left: (e: any) => {
      if (!this.drawing) return;
      const lnglat: [number, number] = [e.lnglat.lng, e.lnglat.lat];
      this.path.push(lnglat);

      this.circle.create(lnglat);
      this.polyline.set(this.path);
    },
    right: (e: any) => {
      if (!this.drawing) return;
      this.polyline.set(this.path);
      this.close();
      this.create.emit(this.path);
    },
  };
}
