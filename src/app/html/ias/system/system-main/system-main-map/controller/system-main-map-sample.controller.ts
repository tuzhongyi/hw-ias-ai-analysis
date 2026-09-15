import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { GpsTaskSampleRecord } from '../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { SystemMainMapAMapController } from './amap/system-main-map-amap.controller';

export class SystemMainMapSampleController {
  inited = false;
  event = {
    dblclick: new EventEmitter<GpsTaskSampleRecord>(),
  };

  constructor(
    private amap: SystemMainMapAMapController,
    subscription: Subscription
  ) {
    this.regist(subscription);
  }
  private datas?: GpsTaskSampleRecord[];
  private loaded = false;
  private token = 0;

  private regist(subscription: Subscription) {
    let sub = this.amap.event.sample.dblclick.subscribe((x) => {
      this.event.dblclick.emit(x);
    });
    subscription.add(sub);
  }

  async load(datas: GpsTaskSampleRecord[]) {
    this.datas = datas;
    let token = ++this.token;
    let [marker, scatter] = await Promise.all([
      this.amap.sample.marker.get(),
      this.amap.sample.scatter.get(),
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
    let [marker, scatter] = await Promise.all([
      this.amap.sample.marker.get(),
      this.amap.sample.scatter.get(),
    ]);
    if (token !== this.token) return;
    scatter.clear();
    marker.clear();
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
}
