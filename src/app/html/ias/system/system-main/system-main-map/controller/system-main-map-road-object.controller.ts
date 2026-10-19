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
    subscription: Subscription,
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
  private token = 0;

  async load(datas: RoadObject[]) {
    this.datas = datas;
    let token = ++this.token;
    let [point, marker] = await Promise.all([
      this.amap.roadobject.point.get(),
      this.amap.roadobject.marker.get(),
    ]);
    // 地图就绪前可能已排队多次 load/clear，只让最后发起的那次生效
    if (token !== this.token) return;
    point.clear();
    point.load(datas);
    marker.clear();
    marker.load(datas);
    this.loaded = true;
    this.inited = true;
  }
  async clear() {
    let token = ++this.token;
    let [point, marker] = await Promise.all([
      this.amap.roadobject.point.get(),
      this.amap.roadobject.marker.get(),
    ]);
    if (token !== this.token) return;
    point.clear();
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
    // 顺手把「怎么摆回这个部件」交给 amap controller：
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
