import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { Paged } from '../../../../../../common/data-core/models/page-list.model';
import { SystemMainMapAMapController } from './amap/system-main-map-amap.controller';

export class SystemMainMapAlarmTimeoutController {
  constructor(
    private amap: SystemMainMapAMapController,
    subscription: Subscription
  ) {
    this.regist(subscription);
  }
  private regist(subscription: Subscription) {
    let sub1 = this.amap.event.alarm.video.subscribe((x) => {
      this.event.video.emit(x);
    });
    subscription.add(sub1);
    let sub2 = this.amap.event.alarm.picture.subscribe((x) => {
      this.event.picture.emit(x);
    });
    subscription.add(sub2);
  }
  event = {
    video: new EventEmitter<MobileEventRecord>(),
    picture: new EventEmitter<Paged<MobileEventRecord>>(),
  };
  private datas?: MobileEventRecord[];
  private loaded = false;
  async load(datas: MobileEventRecord[]) {
    this.datas = datas;
    let marker = await this.amap.alarm.timeout.marker.get();
    marker.load(datas);
    let scatter = await this.amap.alarm.timeout.scatter.get();
    scatter.load(datas);
    this.loaded = true;
  }
  async clear() {
    let scatter = await this.amap.alarm.timeout.scatter.get();
    scatter.clear();
    let marker = await this.amap.alarm.timeout.marker.get();
    marker.clear();
    let info = await this.amap.alarm.timeout.info.get();
    info.remove();
    this.loaded = false;
  }
  reload() {
    if (this.loaded) return;
    if (this.datas) {
      this.load(this.datas);
    }
  }
  async destory() {
    this.datas = undefined;
    return this.clear();
  }

  async select(data: MobileEventRecord) {
    // let marker = await this.amap.alarm.marker.get();
    // marker.select(data);
    let info = await this.amap.alarm.timeout.info.get();
    info.add(data);
    let map = await this.amap.map.get();
    if (data.Location) {
      let position: [number, number] = [
        data.Location.GCJ02.Longitude,
        data.Location.GCJ02.Latitude,
      ];
      map.setCenter(position);
    }
  }
}
