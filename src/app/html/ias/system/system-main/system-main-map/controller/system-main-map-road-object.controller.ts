import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { SystemMainMapAMapController } from './amap/system-main-map-amap.controller';

export class SystemMainMapRoadObjectController {
  inited = false;
  event = {
    click: new EventEmitter<RoadObject>(),
    dblclick: new EventEmitter<RoadObject>(),
  };

  constructor(
    private amap: SystemMainMapAMapController,
    subscription: Subscription
  ) {
    this.regist(subscription);
  }
  private regist(subscription: Subscription) {
    let sub1 = this.amap.event.road.object.click.subscribe((x) => {
      this.event.click.emit(x);
    });
    subscription.add(sub1);
    let sub2 = this.amap.event.road.object.dblclick.subscribe((x) => {
      this.event.dblclick.emit(x);
    });
    subscription.add(sub2);
  }

  private datas?: RoadObject[];
  private loaded = false;

  async load(datas: RoadObject[]) {
    this.datas = datas;
    let point = await this.amap.roadobject.point.get();
    point.load(datas);
    let marker = await this.amap.roadobject.marker.get();
    marker.load(datas);
    this.loaded = true;
    this.inited = true;
  }
  async clear() {
    let point = await this.amap.roadobject.point.get();
    point.clear();
    let marker = await this.amap.roadobject.marker.get();
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

  async focus(data: RoadObject) {
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
    let marker = await this.amap.roadobject.marker.get();
    marker.select(data);
  }
  async over(data: RoadObject) {
    let marker = await this.amap.roadobject.marker.get();
    marker.mouseover(data);
  }
  async out(data: RoadObject) {
    let marker = await this.amap.roadobject.marker.get();
    marker.mouseout(data);
  }
}
