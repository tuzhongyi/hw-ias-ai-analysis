import { MobileDevice } from '../../../../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { IASMapAMapMarkerLabelAbstract } from '../../../../../../../share/map/controller/amap/marker/ias-map-amap-marker-label.abstract';
import { SystemModuleMobileDeviceMapAMapDeviceMarkerIconController } from './system-module-mobile-device-map-amap-device-marker-icon.controller';

export class SystemModuleMobileDeviceMapAMapDeviceMarkerController extends IASMapAMapMarkerLabelAbstract<MobileDevice> {
  constructor(data: MobileDevice) {
    super(data);
    this.icon = this.init(data);
    this.out();
  }

  private _icon =
    new SystemModuleMobileDeviceMapAMapDeviceMarkerIconController();

  init(data: MobileDevice) {
    return {
      normal: data.OnlineStatus === 0 ? this._icon.online : this._icon.offline,
    };
  }
}
