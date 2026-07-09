import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { PathTool } from '../../../../../../../../common/tools/path-tool/path.tool';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { SystemModuleMobileDeviceRouteAMapMatchController } from './match/system-module-mobile-device-route-amap-match.controller';
import { SystemModuleMobileDeviceRouteAMapMarkerController } from './device/system-module-mobile-device-route-amap-device-marker.controller';
import { SystemModuleMobileDeviceRouteAMapSectionController } from './section/system-module-mobile-device-route-amap-section.controller';
import { SystemModuleMobileDeviceRouteAMapPathController } from './system-module-mobile-device-route-amap-path.controller';

export class SystemModuleMobileDeviceRouteAMapController {
  path: SystemModuleMobileDeviceRouteAMapPathController[] = [];
  device =
    new PromiseValue<SystemModuleMobileDeviceRouteAMapMarkerController>();
  section =
    new PromiseValue<SystemModuleMobileDeviceRouteAMapSectionController>();
  match =
    new PromiseValue<SystemModuleMobileDeviceRouteAMapMatchController>();
  constructor(private tool: PathTool) {
    this.init();
  }

  map = new PromiseValue<AMap.Map>();

  private init() {
    let key = 'route_map_container';
    MapHelper.amap
      .get(key, [], false, { viewMode: '2D' })
      .then((x) => {
        this.map.set(x);
        let device = new SystemModuleMobileDeviceRouteAMapMarkerController(
          x,
          this.tool,
        );
        this.device.set(device);

        this.section.set(
          new SystemModuleMobileDeviceRouteAMapSectionController(x),
        );
        this.match.set(
          new SystemModuleMobileDeviceRouteAMapMatchController(x),
        );
      })
      .catch((e) => {
        console.error('Amap 初始化失败', e);
      });
  }

  async destroy() {
    let match = await this.match.get();
    match.clear();
    this.match.clear();

    let section = await this.section.get();
    section.clear();
    this.section.clear();

    let device = await this.device.get();
    device.clear();
    this.device.clear();

    let map = await this.map.get();
    map.destroy();
    this.map.clear();
  }
}
