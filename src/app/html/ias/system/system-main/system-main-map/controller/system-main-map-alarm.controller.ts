import { EventEmitter } from '@angular/core';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
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
    picture: new EventEmitter<MobileEventRecord>(),
  };
  load(datas: MobileEventRecord[]) {
    this.amap.alarm.scatter.get().then((x) => {
      x.load(datas);
    });
    this.amap.alarm.marker.get().then((x) => {
      x.load(datas);
    });
  }
  async clear() {
    let alarm = await this.amap.alarm.scatter.get();
    alarm.clear();
  }
}
