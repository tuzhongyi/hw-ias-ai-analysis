import { EventEmitter } from '@angular/core';
import { SystemModuleRoadAreaDetailsMapAMapCreatorCircleController } from './system-module-road-area-details-map-amap-creator-circle.controller';
import { SystemModuleRoadAreaDetailsMapAMapCreatorPolygonController } from './system-module-road-area-details-map-amap-creator-polygon.controller';

export class SystemModuleRoadAreaDetailsMapAMapCreatorController {
  create = new EventEmitter<[number, number][]>();

  /** 多边形至少要三个顶点，少于三个时右键不结束绘制 */
  private static readonly MinNodes = 3;

  constructor(private map: AMap.Map) {
    this.polygon =
      new SystemModuleRoadAreaDetailsMapAMapCreatorPolygonController(map);
    this.circle =
      new SystemModuleRoadAreaDetailsMapAMapCreatorCircleController(map);

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

  private polygon: SystemModuleRoadAreaDetailsMapAMapCreatorPolygonController;
  private circle: SystemModuleRoadAreaDetailsMapAMapCreatorCircleController;
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
    this.polygon.clear();
    this.circle.clear();
  }

  private remove(position: [number, number]) {
    let index = this.path.findIndex(
      (x) => x[0] === position[0] && x[1] === position[1]
    );
    if (index > -1) {
      this.path.splice(index, 1);
      this.polygon.set(this.path);
    }
  }

  private mousemove(e: any) {
    if (!this.drawing) return;
    const lnglat: [number, number] = [e.lnglat.lng, e.lnglat.lat];
    this.polygon.set([...this.path, lnglat]);
  }
  private click = {
    left: (e: any) => {
      if (!this.drawing) return;
      const lnglat: [number, number] = [e.lnglat.lng, e.lnglat.lat];
      this.path.push(lnglat);

      this.circle.create(lnglat);
      this.polygon.set(this.path);
    },
    right: (e: any) => {
      if (!this.drawing) return;
      if (this.path.length < SystemModuleRoadAreaDetailsMapAMapCreatorController.MinNodes)
        return;
      this.polygon.set(this.path);
      this.close();
      // 闭合交给服务端（区域最后一个点会与第一个点闭合），这里不要补重复的首点
      this.create.emit(this.path);
    },
  };
}
