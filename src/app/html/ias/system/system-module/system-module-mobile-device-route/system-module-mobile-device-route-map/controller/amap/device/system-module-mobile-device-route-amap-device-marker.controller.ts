import { EventEmitter } from '@angular/core';
import { FileGpsItem } from '../../../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { MobileDevice } from '../../../../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { PathTool } from '../../../../../../../../../common/tools/path-tool/path.tool';
import { IASMapAMapMarkerLabelAbstract } from '../../../../../../../share/map/controller/amap/marker/ias-map-amap-marker-label.abstract';
import { SystemModuleMobileDeviceRouteAMapIconController } from './system-module-mobile-device-route-amap-device-icon.controller';

export class SystemModuleMobileDeviceRouteAMapMarkerController {
  dblclick = new EventEmitter<MobileDevice>();
  constructor(private map: AMap.Map, private path: PathTool) {}

  private marker?: Marker;

  load(data: MobileDevice) {
    this.marker = new Marker(data, this.path);
    this.map.add(this.marker.marker);

    // 订阅 marker 的 dblclick 事件
    this.marker.event.dblclick.subscribe((x) => {
      this.dblclick.emit(x);
    });

    return this.marker.marker;
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
  constructor(data: MobileDevice, path: PathTool) {
    super(data);
    this._icon = new SystemModuleMobileDeviceRouteAMapIconController(path);
    this.icon = this.init(data);
    this.out();
  }

  private _icon: SystemModuleMobileDeviceRouteAMapIconController;

  init(data: MobileDevice) {
    return {
      normal: data.OnlineStatus === 0 ? this._icon.online : this._icon.offline,
    };
  }
}
