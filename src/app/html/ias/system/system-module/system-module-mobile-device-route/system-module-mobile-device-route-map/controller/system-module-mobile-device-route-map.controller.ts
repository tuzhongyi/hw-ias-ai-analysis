import { EventEmitter } from '@angular/core';

import { formatDate } from '@angular/common';
import { Subscription } from 'rxjs';
import { FileGpsItem } from '../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { GisPointMatchResult } from '../../../../../../../common/data-core/models/arm/geographic/patrol/gis-point-match-result.model';
import { PatrolSection } from '../../../../../../../common/data-core/models/arm/geographic/patrol/patrol-section.model';
import { MobileDevice } from '../../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { Language } from '../../../../../../../common/tools/language-tool/language';
import { PathTool } from '../../../../../../../common/tools/path-tool/path.tool';
import { ClassTool } from '../../../../../../../common/tools/class-tool/class.tool';
import {
  GeoLine,
  GeoPoint,
} from '../../../../../../../common/tools/geo-tool/geo.model';
import { IIASMapAMapInfo } from '../../../../../share/map/controller/amap/info/ias-map-amap-info.model';
import { SystemModuleMobileDeviceRouteAMapController } from './amap/system-module-mobile-device-route-amap.controller';

export class SystemModuleMobileDeviceRouteMapController {
  constructor(subscription: Subscription, path: PathTool) {
    this.amap = new SystemModuleMobileDeviceRouteAMapController(
      path,
      subscription,
    );
    this.device.event.regist(subscription);
    this.path.event.regist(subscription);
  }

  private amap: SystemModuleMobileDeviceRouteAMapController;

  path = {
    datas: [] as FileGpsItem[],
    event: {
      click: new EventEmitter<{
        line: GeoLine;
        point: GeoPoint;
        percent: number;
      }>(),
      regist: (subscription: Subscription) => {
        subscription.add(
          this.amap.path.event.click.subscribe((x) => {
            this.path.event.click.emit(x);
          }),
        );
        subscription.add(
          this.amap.path.event.mouseover.subscribe((x) => {
            this.path.event.on.over(x);
          }),
        );
        subscription.add(
          this.amap.path.event.mousemove.subscribe((x) => {
            this.path.event.on.over(x);
          }),
        );
        subscription.add(
          this.amap.path.event.mouseout.subscribe(() => {
            this.amap.info.get().then((info) => {
              info.remove();
            });
          }),
        );
      },
      on: {
        over: (x: { line: GeoLine; point: GeoPoint; percent: number }) => {
          this.amap.info.get().then((info) => {
            let start = this.path.datas.find((item) =>
              ClassTool.equals.array([item.Longitude, item.Latitude], x.line[0]),
            );
            let end = this.path.datas.find((item) =>
              ClassTool.equals.array([item.Longitude, item.Latitude], x.line[1]),
            );
            if (start && end && start.OSDTime && end.OSDTime) {
              let timestamp =
                start.OSDTime.getTime() +
                (end.OSDTime.getTime() - start.OSDTime.getTime()) * x.percent;
              let value: IIASMapAMapInfo = {
                Name: formatDate(new Date(timestamp), Language.HHmmss, 'en'),
                Location: x.point,
              };
              info.add(value, undefined, [0, -10]);
            }
          });
        },
      },
    },
    load: async (datas: FileGpsItem[][]) => {
      this.path.datas = datas.flat(1);
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
    reload: async (items: FileGpsItem[]) => {
      let positions = items.map(
        (x) => [x.Longitude, x.Latitude] as [number, number],
      );
      let path = await this.amap.path.create(1);
      return path.load(positions);
    },
    clear: () => {
      this.amap.path.clear();
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
    load: async (datas: PatrolSection[], showDir = true) => {
      let ctr = await this.amap.section.get();
      return ctr.load(datas, showDir);
    },
    showDir: async (value: boolean) => {
      let ctr = await this.amap.section.get();
      ctr.showDir(value);
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
    load: async (datas: GisPointMatchResult[][][], showDir = true) => {
      let ctr = await this.amap.match.get();
      return ctr.load(datas, showDir);
    },
    showDir: async (value: boolean) => {
      let ctr = await this.amap.match.get();
      ctr.showDir(value);
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
