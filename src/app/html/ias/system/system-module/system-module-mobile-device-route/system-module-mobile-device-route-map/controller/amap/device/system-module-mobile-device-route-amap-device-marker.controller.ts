import { FileGpsItem } from '../../../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { MobileDevice } from '../../../../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { IASMapAMapMarkerLabelAbstract } from '../../../../../../../share/map/controller/amap/marker/ias-map-amap-marker-label.abstract';
import { SystemModuleMobileDeviceRouteAMapIconController } from './system-module-mobile-device-route-amap-device-icon.controller';

export class SystemModuleMobileDeviceRouteAMapMarkerController {
  constructor(private map: AMap.Map) {}

  private marker?: Marker;

  load(data: MobileDevice) {
    this.marker = new Marker(data);
    this.map.add(this.marker.marker);
  }

  clear() {
    if (this.marker) {
      this.map.remove(this.marker.marker);
    }
  }

  set = {
    position: (data: FileGpsItem) => {
      if (this.marker) {
        let position: [number, number] = [data.Longitude, data.Latitude];
        this.marker.marker.setPosition(position);
      }
    },
  };
}
class Marker extends IASMapAMapMarkerLabelAbstract<MobileDevice> {
  constructor(data: MobileDevice) {
    super(data);
    this.icon = this.init(data);
    this.out();
  }

  private _icon = new SystemModuleMobileDeviceRouteAMapIconController();

  init(data: MobileDevice) {
    return {
      normal: data.OnlineStatus === 0 ? this._icon.online : this._icon.offline,
    };
  }
}
