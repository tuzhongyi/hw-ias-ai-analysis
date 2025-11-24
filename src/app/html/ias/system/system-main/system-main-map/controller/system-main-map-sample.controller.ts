import { EventEmitter } from '@angular/core';
import { GpsTaskSampleRecord } from '../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { Paged } from '../../../../../../common/data-core/models/page-list.model';
import { SystemMainMapAMapController } from './amap/system-main-map-amap.controller';

export class SystemMainMapSampleController {
  constructor(private amap: SystemMainMapAMapController) {
    this.regist();
  }
  private regist() {
    this.amap.event.sample.video.subscribe((x) => {
      this.event.video.emit(x);
    });
    this.amap.event.sample.picture.subscribe((x) => {
      this.event.picture.emit(x);
    });
  }
  event = {
    video: new EventEmitter<GpsTaskSampleRecord>(),
    picture: new EventEmitter<Paged<GpsTaskSampleRecord>>(),
  };
  private datas?: GpsTaskSampleRecord[];
  load(datas: GpsTaskSampleRecord[]) {
    this.datas = datas;

    this.amap.sample.marker.get().then((x) => {
      x.load(datas);
    });
  }
  async clear() {
    let marker = await this.amap.sample.marker.get();
    marker.clear();
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
