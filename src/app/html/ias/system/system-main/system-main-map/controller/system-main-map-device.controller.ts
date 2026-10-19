import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { MobileDevice } from '../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { SystemMainMapAMapController } from './amap/system-main-map-amap.controller';

export class SystemMainMapDeviceController {
  inited = false;
  event = {
    dblclick: new EventEmitter<MobileDevice>(),
  };

  constructor(
    private amap: SystemMainMapAMapController,
    subscription: Subscription
  ) {
    this.regist(subscription);
  }
  private datas?: MobileDevice[];
  loaded = false;
  private token = 0;

  private regist(subscription: Subscription) {
    let sub = this.amap.event.device.dblclick.subscribe((x) => {
      this.event.dblclick.emit(x);
    });
    subscription.add(sub);
  }
  async load(datas: MobileDevice[]) {
    this.datas = datas;
    let token = ++this.token;
    let marker = await this.amap.device.marker.get();
    // 地图就绪前可能已排队多次 load/clear，只让最后发起的那次生效
    if (token !== this.token) return;
    marker.clear();
    marker.load(datas);
    this.loaded = true;
    this.inited = true;
  }
  async clear() {
    let token = ++this.token;
    let marker = await this.amap.device.marker.get();
    if (token !== this.token) return;
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
    this.inited = false;
    return this.clear();
  }
  async focus(data: MobileDevice) {
    // 顺手把「怎么摆回这台设备」交给 amap controller：
    // 城市兜底晚一步落地时，要靠它把视野抢回来
    let from = () => {
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
    };
    this.amap.claim(from);
    from();
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
