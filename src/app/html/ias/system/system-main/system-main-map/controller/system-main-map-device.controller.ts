import { MobileDevice } from '../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { SystemMainMapAMapController } from './amap/system-main-map-amap.controller';

export class SystemMainMapDeviceController {
  constructor(private amap: SystemMainMapAMapController) {}
  private datas?: MobileDevice[];
  private loaded = false;
  async load(datas: MobileDevice[]) {
    this.datas = datas;
    let marker = await this.amap.device.marker.get();
    marker.load(datas);
    this.loaded = true;
  }
  async clear() {
    let marker = await this.amap.device.marker.get();
    marker.clear();
    this.loaded = false;
  }
  reload() {
    if (this.loaded) return;
    if (this.datas) {
      this.load(this.datas);
    }
  }
  destory() {
    this.datas = undefined;
    return this.clear();
  }
  async focus(data: MobileDevice) {
    if (data.Location) {
      let position: [number, number] = [
        data.Location.GCJ02.Longitude,
        data.Location.GCJ02.Latitude,
      ];
      this.amap.map.get().then((x) => {
        x.setCenter(position);
        x.setZoom(19.5);
      });
    }
    let marker = await this.amap.device.marker.get();
    marker.select(data);
  }
  async over(data: MobileDevice) {
    let marker = await this.amap.device.marker.get();
    marker.mouseover(data);
  }
  async out(data: MobileDevice) {
    let marker = await this.amap.device.marker.get();
    marker.mouseout(data);
  }
}
