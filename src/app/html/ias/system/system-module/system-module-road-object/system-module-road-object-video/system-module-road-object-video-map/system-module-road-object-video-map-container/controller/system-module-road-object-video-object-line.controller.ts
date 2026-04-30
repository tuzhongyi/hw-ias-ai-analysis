import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoadObject } from '../../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { SystemModuleRoadObjectVideoAMapController } from './system-module-road-object-video-amap.controller';

export class SystemMainMapRoadObjectLineController {
  inited = false;
  event = {
    click: new EventEmitter<RoadObject>(),
    dblclick: new EventEmitter<RoadObject>(),
  };

  constructor(
    private amap: SystemModuleRoadObjectVideoAMapController,
    subscription: Subscription
  ) {
    this.regist(subscription);
  }
  private regist(subscription: Subscription) {
    let sub_click = this.amap.event.road.object.line.click.subscribe((x) => {
      this.event.click.emit(x);
    });
    subscription.add(sub_click);

    let sub_dblclick = this.amap.event.road.object.line.dblclick.subscribe(
      (x) => {
        this.event.dblclick.emit(x);
      }
    );
    subscription.add(sub_dblclick);
  }

  private datas?: RoadObject[];

  private loaded = false;

  async load(datas: RoadObject[]) {
    this.datas = datas;
    let polyline = await this.amap.roadobject.polyline.get();
    polyline.load(datas);

    this.loaded = true;
    this.inited = true;
  }
  async clear() {
    let polyline = await this.amap.roadobject.polyline.get();
    polyline.clear();

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
