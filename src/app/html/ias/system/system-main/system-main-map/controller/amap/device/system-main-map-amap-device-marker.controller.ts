import { MobileDevice } from '../../../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { PathTool } from '../../../../../../../../common/tools/path-tool/path.tool';
import { IASMapAMapMarkerLabelAbstract } from '../../../../../../share/map/controller/amap/marker/ias-map-amap-marker-label.abstract';
import { SystemMainMapAMapDeviceMarkerIconController } from './system-main-map-amap-device-marker-icon.controller';

export class SystemMainMapAMapDeviceMarkerController extends IASMapAMapMarkerLabelAbstract<MobileDevice> {
  constructor(data: MobileDevice, path: PathTool) {
    super(data);
    this._icon = new SystemMainMapAMapDeviceMarkerIconController(path);
    this.icon = this.init(data);
    this.out();
  }

  private _icon: SystemMainMapAMapDeviceMarkerIconController;

  init(data: MobileDevice) {
    return {
      normal: data.OnlineStatus === 0 ? this._icon.online : this._icon.offline,
    };
  }
}
