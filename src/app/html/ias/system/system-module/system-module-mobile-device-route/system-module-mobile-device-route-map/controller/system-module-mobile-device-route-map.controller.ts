import { EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs';
import { FileGpsItem } from '../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { GisPointMatchResult } from '../../../../../../../common/data-core/models/arm/geographic/patrol/gis-point-match-result.model';
import { PatrolSection } from '../../../../../../../common/data-core/models/arm/geographic/patrol/patrol-section.model';
import { MobileDevice } from '../../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { PathTool } from '../../../../../../../common/tools/path-tool/path.tool';
import { SystemModuleMobileDeviceRouteAMapPathController } from './amap/system-module-mobile-device-route-amap-path.controller';
import { SystemModuleMobileDeviceRouteAMapController } from './amap/system-module-mobile-device-route-amap.controller';

export class SystemModuleMobileDeviceRouteMapController {
  constructor(subscription: Subscription, path: PathTool) {
    this.amap = new SystemModuleMobileDeviceRouteAMapController(path);
    this.device.event.regist(subscription);
  }

  private amap: SystemModuleMobileDeviceRouteAMapController;

  private controller = {
    path: [] as SystemModuleMobileDeviceRouteAMapPathController[],
  };

  path = {
    event: {
      click: new EventEmitter<MobileDevice>(),
      regist: (subscription: Subscription) => {
        this.amap.device.get().then((x) => {
          let sub = x.dblclick.subscribe((d: MobileDevice) => {
            this.device.event.dblclick.emit(d);
          });
          subscription.add(sub);
        });
      },
    },
    load: async (datas: FileGpsItem[][]) => {
      let positions = datas.map<[number, number][]>((x) =>
        x.map(
          (y) => [y.Longitude, y.Latitude],
          // GeoTool.point.convert.wgs84.to.gcj02()
        ),
      );

      let map = await this.amap.map.get();

      let polylines = datas
        .map((items, i) => {
          let positions = items.map(
            (x) => [x.Longitude, x.Latitude] as [number, number],
          );
          let type = items.every((x) => !!x.HighPrecision) ? 1 : 0;
          let path = new SystemModuleMobileDeviceRouteAMapPathController(
            map,
            type,
          );
          this.controller.path.push(path);
          return path.load(positions)!;
        })
        .filter((x) => !!x);
      return polylines;
    },
    clear: () => {
      this.controller.path.forEach((x) => {
        x.clear();
      });
      this.controller.path = [];
    },
  };

  map = {
    focus: async (data: any) => {
      let map = await this.amap.map.get();
      map.setFitView(data);
    },
    destroy: async () => {
      this.path.clear();
      await this.device.clear();
      await this.amap.destroy();
    },
  };

  section = {
    load: async (datas: PatrolSection[]) => {
      let ctr = await this.amap.section.get();
      return ctr.load(datas);
    },
    select: async (id: string) => {
      let ctr = await this.amap.section.get();
      ctr.select(id);
    },
    blur: async () => {
      let ctr = await this.amap.section.get();
      ctr.blur();
    },
    hover: async (id: string) => {
      let ctr = await this.amap.section.get();
      ctr.hover(id);
    },
    blurHover: async () => {
      let ctr = await this.amap.section.get();
      ctr.blurHover();
    },
    clear: async () => {
      let ctr = await this.amap.section.get();
      ctr.clear();
    },
  };

  match = {
    load: async (datas: GisPointMatchResult[][][]) => {
      let ctr = await this.amap.match.get();
      return ctr.load(datas);
    },
    clear: async () => {
      let ctr = await this.amap.match.get();
      ctr.clear();
    },
  };

  device = {
    event: {
      dblclick: new EventEmitter<MobileDevice>(),
      regist: (subscription: Subscription) => {
        this.amap.device.get().then((x) => {
          let sub = x.dblclick.subscribe((d: MobileDevice) => {
            this.device.event.dblclick.emit(d);
          });
          subscription.add(sub);
        });
      },
    },

    load: (data: MobileDevice) => {
      return this.amap.device.get().then((x) => {
        return x.load(data);
      });
    },
    clear: async () => {
      let device = await this.amap.device.get();
      device.clear();
    },
    set: {
      position: (data: FileGpsItem) => {
        this.amap.device.get().then((x) => x.set.position(data));
      },
    },
  };
}
