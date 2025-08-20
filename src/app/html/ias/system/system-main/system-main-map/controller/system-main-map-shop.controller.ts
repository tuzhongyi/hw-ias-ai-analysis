import { EventEmitter } from '@angular/core';
import { IShop } from '../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { SystemMainMapAMapController } from './amap/system-main-map-amap.controller';

export class SystemMainMapShopController {
  constructor(private amap: SystemMainMapAMapController) {
    this.regist();
  }

  private regist() {
    this.amap.event.shop.click.subscribe((x) => {
      this.event.click.emit(x);
    });
    this.amap.event.shop.dblclick.subscribe((x) => {
      this.event.dblclick.emit(x);
    });
  }

  event = {
    click: new EventEmitter<IShop>(),
    dblclick: new EventEmitter<IShop>(),
  };
  load(datas: IShop[]) {
    this.amap.shop.point.get().then((x) => {
      x.load(datas);
    });
    this.amap.shop.marker.get().then((ctr) => {
      ctr.load(datas);
    });
  }
  async clear() {
    let point = await this.amap.shop.point.get();
    point.clear();
    let marker = await this.amap.shop.marker.get();
    marker.clear();
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
