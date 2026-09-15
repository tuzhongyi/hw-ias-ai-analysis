import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { Paged } from '../../../../../../common/data-core/models/interface/page-list.model';
import { SystemMainMapAMapController } from './amap/system-main-map-amap.controller';

export class SystemMainMapAlarmTimeoutController {
  inited = false;
  event = {
    video: new EventEmitter<MobileEventRecord>(),
    picture: new EventEmitter<Paged<MobileEventRecord>>(),
    details: new EventEmitter<MobileEventRecord>(),
  };

  constructor(
    private amap: SystemMainMapAMapController,
    subscription: Subscription
  ) {
    this.regist(subscription);
  }

  private datas?: MobileEventRecord[];
  private loaded = false;
  private token = 0;
  private regist(subscription: Subscription) {
    let sub1 = this.amap.event.alarm.video.subscribe((x) => {
      this.event.video.emit(x);
    });
    subscription.add(sub1);
    let sub2 = this.amap.event.alarm.picture.subscribe((x) => {
      this.event.picture.emit(x);
    });
    subscription.add(sub2);
    let sub3 = this.amap.event.alarm.details.subscribe((x) => {
      this.event.details.emit(x);
    });
    subscription.add(sub3);
  }

  async load(datas: MobileEventRecord[]) {
    this.datas = datas;
    let token = ++this.token;
    let [marker, scatter] = await Promise.all([
      this.amap.alarm.timeout.marker.get(),
      this.amap.alarm.timeout.scatter.get(),
    ]);
    // 地图就绪前可能已排队多次 load/clear，只让最后发起的那次生效
    if (token !== this.token) return;
    marker.clear();
    marker.load(datas);
    scatter.clear();
    scatter.load(datas);
    this.loaded = true;
    this.inited = true;
  }
  async clear() {
    let token = ++this.token;
    let [marker, scatter, info] = await Promise.all([
      this.amap.alarm.timeout.marker.get(),
      this.amap.alarm.timeout.scatter.get(),
      this.amap.alarm.timeout.info.get(),
    ]);
    if (token !== this.token) return;
    scatter.clear();
    marker.clear();
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
    this.inited = false;
    return this.clear();
  }

  async select(data: MobileEventRecord) {
    // let marker = await this.amap.alarm.marker.get();
    // marker.select(data);
    let info = await this.amap.alarm.timeout.info.get();
    info.add(data);
    // let map = await this.amap.map.get();
    // if (data.Location) {
    //   let position: [number, number] = [
    //     data.Location.GCJ02.Longitude,
    //     data.Location.GCJ02.Latitude,
    //   ];
    //   map.setCenter(position);
    // }
  }
}
