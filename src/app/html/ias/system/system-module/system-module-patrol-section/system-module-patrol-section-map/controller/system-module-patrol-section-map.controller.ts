import { Subscription } from 'rxjs';
import { FileGpsItem } from '../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { PatrolSection } from '../../../../../../../common/data-core/models/arm/geographic/patrol/patrol-section.model';
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';
import { SystemModulePatrolSectionAMapController } from './amap/system-module-patrol-section-amap.controller';

export class SystemModulePatrolSectionMapController {
  get event() {
    return {
      path: this.amap.path.event,
      selection: {
        cancel: this.amap.selection.event.cancel,
        completed: this.amap.selection.event.completed,
      },
    };
  }

  constructor(subscription: Subscription) {
    this.amap = new SystemModulePatrolSectionAMapController(subscription);
    this.amap.selection.event.cancel.subscribe(() => {
      this.selection.start = undefined;
      this.selection.end = undefined;
    });
    this.amap.selection.event.completed.subscribe(() => {
      this.selection.start = undefined;
      this.selection.end = undefined;
    });
  }

  private amap: SystemModulePatrolSectionAMapController;

  map = {
    focus: async (data: any, immediately?: boolean) => {
      let map = await this.amap.map.get();
      map.setFitView(data, immediately);
    },
    destroy: async () => {
      this.path.clear();
      await this.amap.destroy();
    },
  };
  section = {
    load: (datas: PatrolSection[]) => {
      return this.amap.section.load(datas);
    },
    select: (id: string) => {
      this.amap.section.select(id);
    },
    blur: () => {
      this.amap.section.blur();
    },
    hover: (id: string) => {
      this.amap.section.hover(id);
    },
    blurHover: () => {
      this.amap.section.blurHover();
    },
    label: {
      show: () => {
        this.amap.section.label.show();
      },
      hide: () => {
        this.amap.section.label.hide();
      },
      showOnly: (id: string) => {
        this.amap.section.label.showOnly(id);
      },
    },
    clear: () => {
      this.amap.section.clear();
    },
  };

  path = {
    load: async (datas: FileGpsItem[][]) => {
      let polylines: AMap.Polyline[] = [];

      for (let i = 0; i < datas.length; i++) {
        const items = datas[i];
        let positions = items.map(
          (x) => [x.Longitude, x.Latitude] as [number, number],
        );
        let type = items.every((x) => !!x.HighPrecision) ? 1 : 0;
        let path = await this.amap.path.create(type);
        let line = path.load(positions);
        if (line) {
          polylines.push(line);
        }
      }
      return polylines;
    },
    clear: () => {
      this.amap.path.clear();
    },
  };

  /** 路径段选中 */
  selection = {
    start: undefined as FileGpsItem | undefined,
    end: undefined as FileGpsItem | undefined,

    /** 根据点击坐标查找最近的 FileGpsItem（结合几何距离 + OffsetTime 筛选） */
    findClosest: (
      point: [number, number],
      datas: FileGpsItem[],
    ): FileGpsItem | undefined => {
      if (datas.length === 0) return undefined;
      let result = GeoTool.point.closest(
        datas.map((x) => [x.Longitude, x.Latitude] as [number, number]),
        point,
      );
      if (result) {
        return datas[result.index];
      }
      return undefined;
    },

    set: async (point: [number, number], datas: FileGpsItem[]) => {
      let item = this.selection.findClosest(point, datas);
      if (!item) return undefined;

      if (this.selection.start) {
        this.selection.end = item;
        await this.amap.selection.set.end([item.Longitude, item.Latitude]);
        return [this.selection.start, this.selection.end];
      } else {
        // 新选开始前清除上一次的 marker 和路径
        await this.amap.selection.clear();
        this.selection.start = item;

        let positions = datas.map(
          (x) => [x.Longitude, x.Latitude] as [number, number],
        );
        let startIndex = datas.indexOf(item);
        await this.amap.selection.set.start(
          [item.Longitude, item.Latitude],
          positions,
          startIndex,
        );
      }
      return undefined;
    },

    /** 从缓存数据中截取起止点位之间的路径段并绘制 */
    load: async (datas: FileGpsItem[]) => {
      if (!this.selection.start || !this.selection.end) return;

      let si = datas.indexOf(this.selection.start);
      let ei = datas.indexOf(this.selection.end);
      if (si < 0 || ei < 0) return;
      if (si > ei) [si, ei] = [ei, si];

      let seg = datas
        .slice(si, ei + 1)
        .map((x) => [x.Longitude, x.Latitude] as [number, number]);
      if (seg.length >= 2) {
        await this.amap.selection.draw(seg);
      }
    },

    clear: async () => {
      await this.amap.selection.clear();
      this.selection.start = undefined;
      this.selection.end = undefined;
    },
  };
}
