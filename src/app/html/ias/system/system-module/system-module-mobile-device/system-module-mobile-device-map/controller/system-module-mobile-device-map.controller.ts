import { PathTool } from '../../../../../../../common/tools/path-tool/path.tool';
import { SystemModuleMobileDeviceMapAMapController } from './amap/system-module-mobile-device-map-amap.controller';

export class SystemModuleMobileDeviceMapController {
  constructor(id: string, path: PathTool) {
    this.amap = new SystemModuleMobileDeviceMapAMapController(id, path);
  }
  amap: SystemModuleMobileDeviceMapAMapController;
}
