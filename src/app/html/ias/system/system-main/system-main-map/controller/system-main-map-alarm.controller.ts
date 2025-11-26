import { EventEmitter } from '@angular/core';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { Paged } from '../../../../../../common/data-core/models/page-list.model';
import { SystemMainMapAMapController } from './amap/system-main-map-amap.controller';

export class SystemMainMapAlarmController {
  constructor(private amap: SystemMainMapAMapController) {
    this.regist();
  }
  private regist() {
    this.amap.event.alarm.video.subscribe((x) => {
      this.event.video.emit(x);
    });
    this.amap.event.alarm.picture.subscribe((x) => {
      this.event.picture.emit(x);
    });
  }
  event = {
    video: new EventEmitter<MobileEventRecord>(),
    picture: new EventEmitter<Paged<MobileEventRecord>>(),
  };
  private datas?: MobileEventRecord[];
  load(datas: MobileEventRecord[]) {
    this.datas = datas;
    this.amap.alarm.scatter.get().then((x) => {
      x.load(datas);
    });
    this.amap.alarm.marker.get().then((x) => {
      x.load(datas);
    });
  }
  async clear() {
    let scatter = await this.amap.alarm.scatter.get();
    scatter.clear();
    let marker = await this.amap.alarm.marker.get();
    marker.clear();
    let info = await this.amap.alarm.info.get();
    info.remove();
  }
  reload() {
    if (this.datas) {
      this.load(this.datas);
    }
  }
  async destory() {
    this.datas = undefined;
    return this.clear();
  }
}
