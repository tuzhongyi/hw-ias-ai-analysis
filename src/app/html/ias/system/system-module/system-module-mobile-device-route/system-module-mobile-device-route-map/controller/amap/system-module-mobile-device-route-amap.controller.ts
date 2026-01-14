import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { SystemModuleMobileDeviceRouteAMapMarkerController } from './device/system-module-mobile-device-route-amap-device-marker.controller';
import { SystemModuleMobileDeviceRouteAMapPathController } from './system-module-mobile-device-route-amap-path.controller';

export class SystemModuleMobileDeviceRouteAMapController {
  path: SystemModuleMobileDeviceRouteAMapPathController[] = [];
  device =
    new PromiseValue<SystemModuleMobileDeviceRouteAMapMarkerController>();
  constructor() {
    this.init();
  }

  map = new PromiseValue<AMap.Map>();

  private init() {
    let key = 'route_map_container';
    MapHelper.amap.get(key, [], false, { viewMode: '2D' }).then((x) => {
      x.setFeatures(['bg', 'road', 'point']);
      this.map.set(x);

      let device = new SystemModuleMobileDeviceRouteAMapMarkerController(x);
      this.device.set(device);
    });
  }

  async destroy() {
    let device = await this.device.get();
    device.clear();

    let map = await this.map.get();
    map.destroy();
    this.map.clear();
  }
}
