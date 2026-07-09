import { EventEmitter } from '@angular/core';
import {
  GeoPoint,
  GeoPolyline,
} from '../../../../../../../../../common/tools/geo-tool/geo.model';
import { GeoTool } from '../../../../../../../../../common/tools/geo-tool/geo.tool';
import { SystemModulePatrolSectionAMapSelectionLineController } from './system-module-patrol-section-amap-selection-line.controller';
import { SystemModulePatrolSectionAMapSelectionMarkerController } from './system-module-patrol-section-amap-selection-marker.controller';
import { SystemModulePatrolSectionAMapSelectionPathController } from './system-module-patrol-section-amap-selection-path.controller';

export class SystemModulePatrolSectionAMapSelectionController {
  event = {
    cancel: new EventEmitter<void>(),
    completed: new EventEmitter<[number, number][]>(),
  };
  constructor(private map: AMap.Map) {
    this.marker = new SystemModulePatrolSectionAMapSelectionMarkerController(
      map,
    );
    this.line = new SystemModulePatrolSectionAMapSelectionLineController(map);
    this.path = new SystemModulePatrolSectionAMapSelectionPathController(map);
    // 右击始终清除所有 marker 和路径
    this.map.on('rightclick', () => {
      this.clear();
    });
  }

  private marker: SystemModulePatrolSectionAMapSelectionMarkerController;
  private line: SystemModulePatrolSectionAMapSelectionLineController;
  private path: SystemModulePatrolSectionAMapSelectionPathController;

  private point: {
    start?: GeoPoint;
  } = {};

  /** 点击位置 + 轨道数据（用于鼠标预览路径） */
  private preview?: {
    clickPosition: GeoPoint;
    positions: GeoPolyline;
    startIndex: number;
  };

  /** 地图事件句柄 */
  private handle: {
    mouse?: {
      move: (e: any) => void;
    };
    click?: {
      right: (e: any) => void;
    };
  } = {};

  private regist = {
    do: () => {
      this.handle.mouse = {
        move: (e: any) => {
          if (this.point.start && this.preview) {
            let mouse: [number, number] = [e.lnglat.lng, e.lnglat.lat];
            let foot = AMap.GeometryUtil.closestOnLine(
              mouse,
              [...this.preview.positions],
            ) as unknown as [number, number];
            if (foot) {
              let closest = GeoTool.point.closest(this.preview.positions, foot);
              if (closest) {
                let si = Math.min(this.preview.startIndex, closest.index);
                let ei = Math.max(this.preview.startIndex, closest.index);
                let seg = this.preview.positions.slice(si, ei + 1);
                // 头=点击位置，尾=垂足
                seg[0] = this.preview.clickPosition;
                seg[seg.length - 1] = foot;
                this.line.update(seg);
              }
            }
          }
        },
      };
      this.map.on('mousemove', this.handle.mouse.move);
    },
    un: () => {
      if (this.handle.mouse) {
        this.map.off('mousemove', this.handle.mouse.move);
        this.handle.mouse = undefined;
      }
    },
  };

  set = {
    /** 放置起点 marker + 轨道预览路径 */
    start: (p: GeoPoint, positions: GeoPolyline, startIndex: number) => {
      this.preview = { clickPosition: p, positions, startIndex };
      this.point.start = p;
      this.marker.createStart(p);

      this.regist.do();
    },
    /** 放置终点 marker + 移除预览路径 */
    end: (p: GeoPoint) => {
      this.line.remove();
      this.regist.un();
      this.marker.createEnd(p);
    },
  };

  /** 直接绘制给定的路径段（点位已由上层截取好） */
  drawPath(positions: GeoPolyline) {
    let line = this.path.drawPath(positions);
    this.event.completed.emit(line);
  }

  /** 取消选中（移除起点 marker + 预览路径 + 地图事件 + 清理数据） */
  private cancel() {
    this.marker.removeStart();
    this.line.remove();
    this.regist.un();
    this.preview = undefined;
    this.point = {};
    this.event.cancel.emit();
  }

  /** 清理全部 */
  clear() {
    this.cancel();
    this.marker.removeEnd();
    this.path.clear();
  }
}
