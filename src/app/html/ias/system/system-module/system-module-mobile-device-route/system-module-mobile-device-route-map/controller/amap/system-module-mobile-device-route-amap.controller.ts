import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { PathTool } from '../../../../../../../../common/tools/path-tool/path.tool';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { SystemModuleMobileDeviceRouteAMapMarkerController } from './device/system-module-mobile-device-route-amap-device-marker.controller';
import { SystemModuleMobileDeviceRouteAMapMatchController } from './match/system-module-mobile-device-route-amap-match.controller';
import { SystemModuleMobileDeviceRouteAMapSectionController } from './section/system-module-mobile-device-route-amap-section.controller';
import { SystemModuleMobileDeviceRouteAMapPathController } from './system-module-mobile-device-route-amap-path.controller';

export class SystemModuleMobileDeviceRouteAMapController {
  get device() {
    return this.controller.device;
  }
  get section() {
    return this.controller.section;
  }
  get match() {
    return this.controller.match;
  }

  constructor(
    private tool: PathTool,
    private subscription: Subscription,
  ) {
    this.init();
  }

  map = new PromiseValue<AMap.Map>();

  private controller = {
    path: [] as SystemModuleMobileDeviceRouteAMapPathController[],
    device:
      new PromiseValue<SystemModuleMobileDeviceRouteAMapMarkerController>(),
    section:
      new PromiseValue<SystemModuleMobileDeviceRouteAMapSectionController>(),
    match: new PromiseValue<SystemModuleMobileDeviceRouteAMapMatchController>(),
  };

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
        this.controller.device.set(device);

        this.controller.section.set(
          new SystemModuleMobileDeviceRouteAMapSectionController(x),
        );
        this.controller.match.set(
          new SystemModuleMobileDeviceRouteAMapMatchController(x),
        );
      })
      .catch((e) => {
        console.error('Amap 初始化失败', e);
      });
  }
  private regist = {
    path: (controller: SystemModuleMobileDeviceRouteAMapPathController) => {
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
      let path = new SystemModuleMobileDeviceRouteAMapPathController(map, type);

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

  async destroy() {
    let match = await this.controller.match.get();
    match.clear();
    this.controller.match.clear();

    let section = await this.controller.section.get();
    section.clear();
    this.controller.section.clear();

    let device = await this.controller.device.get();
    device.clear();
    this.controller.device.clear();

    let map = await this.map.get();
    map.destroy();
    this.map.clear();
  }
}
