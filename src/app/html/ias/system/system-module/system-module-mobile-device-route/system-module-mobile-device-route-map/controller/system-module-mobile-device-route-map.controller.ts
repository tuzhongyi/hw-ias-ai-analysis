import { Injectable } from '@angular/core';

import { FileGpsItem } from '../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { MobileDevice } from '../../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { SystemModuleMobileDeviceRouteAMapPathController } from './amap/system-module-mobile-device-route-amap-path.controller';
import { SystemModuleMobileDeviceRouteAMapController } from './amap/system-module-mobile-device-route-amap.controller';

@Injectable()
export class SystemModuleMobileDeviceRouteMapController {
  private amap = new SystemModuleMobileDeviceRouteAMapController();

  private controller = {
    path: [] as SystemModuleMobileDeviceRouteAMapPathController[],
  };

  path = {
    load: async (datas: FileGpsItem[][]) => {
      let positions = datas.map<[number, number][]>((x) =>
        x.map(
          (y) => [y.Longitude, y.Latitude]
          // GeoTool.point.convert.wgs84.to.gcj02()
        )
      );

      let map = await this.amap.map.get();

      let polylines = positions
        .map((paths, i) => {
          let path = new SystemModuleMobileDeviceRouteAMapPathController(
            map,
            i
          );
          this.controller.path.push(path);
          return path.load(paths)!;
        })
        .filter((x) => !!x);

      map.setFitView(polylines, true);
      setTimeout(() => {
        map.setFitView(polylines, true);
      }, 2 * 1000);
    },
    clear: () => {
      this.controller.path.forEach((x) => {
        x.clear();
      });
      this.controller.path = [];
    },
  };

  map = {
    destroy: async () => {
      this.path.clear();
      await this.device.clear();
      await this.amap.destroy();
    },
  };

  device = {
    load: (data: MobileDevice) => {
      this.amap.device.get().then((x) => x.load(data));
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
