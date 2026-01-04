import { MobileDevice } from '../../../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { IASMapAMapInfoController } from '../../../../../../share/map/controller/amap/info/ias-map-amap-info.controller';
import { SystemModuleMobileDeviceMapAMapDeviceMarkerLayerController } from './device/system-module-mobile-device-map-amap-device-marker-layer.controller';

export class SystemModuleMobileDeviceMapAMapController {
  constructor(id: string) {
    MapHelper.amap.get(id).then((map) => {
      this.map.set(map);

      let info = this.init.info(map);
      this.init.device(map, info);
    });
  }

  private map = new PromiseValue<AMap.Map>();
  private device =
    new PromiseValue<SystemModuleMobileDeviceMapAMapDeviceMarkerLayerController>();
  private info = new PromiseValue<IASMapAMapInfoController>();
  private init = {
    info: (map: AMap.Map) => {
      let ctr = new IASMapAMapInfoController(map);
      this.info.set(ctr);
      return ctr;
    },
    device: (map: AMap.Map, info: IASMapAMapInfoController) => {
      let ctr = new SystemModuleMobileDeviceMapAMapDeviceMarkerLayerController(
        map,
        info
      );

      this.device.set(ctr);
    },
  };

  async load(datas: MobileDevice[]) {
    let ctr = await this.device.get();
    ctr.load(datas);
  }
  async clear() {
    let ctr = await this.device.get();
    ctr.clear();
  }
  focus() {
    this.map.get().then((x) => {
      x.setFitView(undefined, true);
    });
  }
}
