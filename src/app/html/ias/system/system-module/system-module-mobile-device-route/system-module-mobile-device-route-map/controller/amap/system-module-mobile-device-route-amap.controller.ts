import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { SystemModuleMobileDeviceRouteAMapPathController } from './system-module-mobile-device-route-amap-path.controller';

export class SystemModuleMobileDeviceRouteAMapController {
  path: SystemModuleMobileDeviceRouteAMapPathController[] = [];

  constructor() {
    this.init();
  }

  map = new PromiseValue<AMap.Map>();

  private init() {
    let key = 'route_map_container';
    MapHelper.amap.get(key, [], false, { viewMode: '2D' }).then((x) => {
      x.setFeatures(['bg', 'road', 'point']);
      this.map.set(x);
    });
  }

  destroy() {
    this.map.get().then((x) => {
      x.destroy();
      this.map.clear();
    });
  }
}
