import { SystemModuleMobileDeviceMapAMapController } from './amap/system-module-mobile-device-map-amap.controller';

export class SystemModuleMobileDeviceMapController {
  constructor(id: string) {
    this.amap = new SystemModuleMobileDeviceMapAMapController(id);
  }
  amap: SystemModuleMobileDeviceMapAMapController;
}
