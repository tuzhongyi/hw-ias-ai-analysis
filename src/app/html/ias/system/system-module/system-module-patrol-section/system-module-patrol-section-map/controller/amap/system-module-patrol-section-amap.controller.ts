import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { PatrolSection } from '../../../../../../../../common/data-core/models/arm/geographic/patrol/patrol-section.model';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import {
  GeoPoint,
  GeoPolyline,
} from '../../../../../../../../common/tools/geo-tool/geo.model';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { SystemModulePatrolSectionAMapSectionLabelController } from './section/system-module-patrol-section-amap-section-label.controller';
import { SystemModulePatrolSectionAMapSectionPolylineController } from './section/system-module-patrol-section-amap-section-polyline.controller';
import { SystemModulePatrolSectionAMapSelectionController } from './selection/system-module-patrol-section-amap-selection.controller';
import { SystemModulePatrolSectionAMapPathController } from './system-module-patrol-section-amap-path.controller';

export class SystemModulePatrolSectionAMapController {
  constructor(private subscription: Subscription) {
    this.init();
  }

  map = new PromiseValue<AMap.Map>();

  private controller = {
    selection:
      new PromiseValue<SystemModulePatrolSectionAMapSelectionController>(),
    path: [] as SystemModulePatrolSectionAMapPathController[],
    section: {
      polyline:
        new PromiseValue<SystemModulePatrolSectionAMapSectionPolylineController>(),
      label:
        new PromiseValue<SystemModulePatrolSectionAMapSectionLabelController>(),
    },
  };

  private init() {
    let key = 'patrol_plan_map_container';
    MapHelper.amap
      .get(key, [], false, { viewMode: '2D' })
      .then((x) => {
        this.map.set(x);
        let selection = new SystemModulePatrolSectionAMapSelectionController(x);
        this.subscription.add(
          selection.event.cancel.subscribe(() => {
            this.selection.event.cancel.emit();
          }),
        );
        this.subscription.add(
          selection.event.completed.subscribe((seg) => {
            this.selection.event.completed.emit(seg);
          }),
        );
        this.controller.selection.set(selection);

        this.controller.section.polyline.set(
          new SystemModulePatrolSectionAMapSectionPolylineController(x),
        );
        this.controller.section.label.set(
          new SystemModulePatrolSectionAMapSectionLabelController(x),
        );
      })
      .catch((e) => {
        console.error('Amap 初始化失败', e);
      });
  }

  private sectionGeneration = 0;

  section = {
    load: async (datas: PatrolSection[]) => {
      let generation = ++this.sectionGeneration;

      let map = await this.map.get();
      let polyline = await this.controller.section.polyline.get();
      let label = await this.controller.section.label.get();

      if (generation !== this.sectionGeneration) return;

      polyline.clear();
      label.clear();

      let lines: AMap.Polyline[] = [];

      for (let i = 0; i < datas.length; i++) {
        const item = datas[i];
        if (item.GeoLine) {
          let positions = item.GeoLine.map<[number, number]>((x) => {
            return [x.Longitude, x.Latitude];
          });
          let line = polyline.add(item.Id, positions);
          label.add(item);
          lines.push(...line);
        }
      }
      return lines;
    },
    select: async (id: string) => {
      let polyline = await this.controller.section.polyline.get();
      polyline.select(id);
    },
    blur: async () => {
      let polyline = await this.controller.section.polyline.get();
      polyline.blur();
    },
    hover: async (id: string) => {
      let polyline = await this.controller.section.polyline.get();
      polyline.highlight(id);
    },
    blurHover: async () => {
      let polyline = await this.controller.section.polyline.get();
      polyline.unhighlight();
    },
    label: {
      show: async () => {
        let label = await this.controller.section.label.get();
        label.show();
      },
      hide: async () => {
        let label = await this.controller.section.label.get();
        label.hide();
      },
      showOnly: async (id: string) => {
        let label = await this.controller.section.label.get();
        label.showOnly(id);
      },
    },
    clear: async () => {
      let polyline = await this.controller.section.polyline.get();
      polyline.clear();
      let label = await this.controller.section.label.get();
      label.clear();
    },
    destroy: async () => {
      await this.section.clear();
      this.controller.section.polyline.clear();
      this.controller.section.label.clear();
    },
  };

  async destroy() {
    await this.section.destroy();

    this.controller.path.forEach((x) => {
      x.clear();
    });
    this.controller.path = [];

    let selection = await this.controller.selection.get();
    selection.clear();
    this.controller.selection.clear();

    let map = await this.map.get();
    map.destroy();
    this.map.clear();
  }

  private regist = {
    path: (controller: SystemModulePatrolSectionAMapPathController) => {
      this.subscription.add(
        controller.click.subscribe((x) => {
          this.path.event.click.emit(x);
        }),
      );
    },
  };

  path = {
    event: {
      click: new EventEmitter<[number, number]>(),
    },
    create: async (type: number) => {
      let map = await this.map.get();
      let path = new SystemModulePatrolSectionAMapPathController(map, type);
      this.path.event.click.subscribe();
      this.regist.path(path);

      this.controller.path.push(path);
      return path;
    },
    clear: () => {
      this.controller.path.forEach((x) => {
        x.clear();
      });
      this.controller.path = [];
    },
  };

  selection = {
    event: {
      cancel: new EventEmitter<void>(),
      completed: new EventEmitter<[number, number][]>(),
    },
    set: {
      start: async (
        p: GeoPoint,
        positions: GeoPolyline,
        startIndex: number,
      ) => {
        let controller = await this.controller.selection.get();
        controller.set.start(p, positions, startIndex);
      },
      end: async (p: GeoPoint) => {
        let controller = await this.controller.selection.get();
        controller.set.end(p);
      },
    },
    draw: async (positions: GeoPolyline) => {
      let controller = await this.controller.selection.get();
      controller.drawPath(positions);
    },
    clear: async () => {
      let controller = await this.controller.selection.get();
      controller.clear();
    },
  };
}
