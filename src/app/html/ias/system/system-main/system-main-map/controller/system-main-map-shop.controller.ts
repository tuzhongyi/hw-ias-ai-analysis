import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { IShop } from '../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { SystemMainMapAMapController } from './amap/system-main-map-amap.controller';

export class SystemMainMapShopController {
  inited = false;
  event = {
    click: new EventEmitter<IShop>(),
    dblclick: new EventEmitter<IShop>(),
  };

  constructor(
    private amap: SystemMainMapAMapController,
    subscription: Subscription
  ) {
    this.regist(subscription);
  }

  private datas?: IShop[];
  private loaded = false;

  private regist(subscription: Subscription) {
    let sub1 = this.amap.event.shop.click.subscribe((x) => {
      this.event.click.emit(x);
    });
    subscription.add(sub1);
    let sub2 = this.amap.event.shop.dblclick.subscribe((x) => {
      this.event.dblclick.emit(x);
    });
    subscription.add(sub2);
  }

  async load(datas: IShop[]) {
    this.datas = datas;
    let point = await this.amap.shop.point.get();
    point.load(datas);
    let marker = await this.amap.shop.marker.get();
    marker.load(datas);
    this.loaded = true;
    this.inited = true;
  }
  async clear() {
    let point = await this.amap.shop.point.get();
    point.clear();
    let marker = await this.amap.shop.marker.get();
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

  async focus(data: IShop) {
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
    let marker = await this.amap.shop.marker.get();
    marker.select(data);
  }
  async over(data: IShop) {
    let marker = await this.amap.shop.marker.get();
    marker.mouseover(data);
  }
  async out(data: IShop) {
    let marker = await this.amap.shop.marker.get();
    marker.mouseout(data);
  }
}
