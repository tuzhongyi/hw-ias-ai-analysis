import { EventEmitter } from '@angular/core';
import { GpsTaskSampleRecord } from '../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { SystemMainMapAMapController } from './amap/system-main-map-amap.controller';

export class SystemMainMapSampleController {
  constructor(private amap: SystemMainMapAMapController) {
    this.regist();
  }
  private regist() {
    this.amap.event.sample.dblclick.subscribe((x) => {
      this.event.dblclick.emit(x);
    });
  }
  event = {
    dblclick: new EventEmitter<GpsTaskSampleRecord>(),
  };
  private datas?: GpsTaskSampleRecord[];
  private loaded = false;
  async load(datas: GpsTaskSampleRecord[]) {
    this.datas = datas;
    let marker = await this.amap.sample.marker.get();
    marker.load(datas);
    this.loaded = true;
  }
  async clear() {
    let marker = await this.amap.sample.marker.get();
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
    return this.clear();
  }
}
