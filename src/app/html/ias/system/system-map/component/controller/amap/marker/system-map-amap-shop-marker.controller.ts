import { IShop } from '../../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { SystemAMapShopIconController } from './system-map-amap-shop-icon.controller';

import {
  ISystemAMapShopIconController,
  ISystemAMapShopLabelMarkerController,
  SystemAMapShopMarkerEvent,
} from './system-map-amap-shop-marker.model';

export class SystemAMapShopLabelMarkerController
  implements ISystemAMapShopLabelMarkerController
{
  event = new SystemAMapShopMarkerEvent();
  marker: AMap.LabelMarker;
  selected = false;
  data: IShop;

  constructor(data: IShop) {
    this.marker = this.create(data);
    this.data = data;
  }

  protected icon: ISystemAMapShopIconController =
    new SystemAMapShopIconController();

  private create(data: IShop) {
    if (data.Location) {
      let position: [number, number] = [
        data.Location.GCJ02.Longitude,
        data.Location.GCJ02.Latitude,
      ];
      let marker = new AMap.LabelMarker({
        icon: this.icon.get(data.ObjectState).normal,
        position: [...position],
        title: data.Name,
      });
      this.regist(marker);
      return marker;
    }
    throw new Error('Location is not defined');
  }

  private regist(marker: AMap.LabelMarker) {
    marker.on('mouseover', (e: any) => {
      this.hover();
      this.event.mouseover.emit(this.data);
    });
    marker.on('mouseout', (e: any) => {
      this.out();
      this.event.mouseout.emit(this.data);
    });
    marker.on('click', (e: any) => {
      this.event.click.emit(this.data);
    });
  }

  hover() {
    if (this.selected) return;

    this.marker.setIcon(this.icon.get(this.data.ObjectState).hover);
    this.marker.setzIndex(2);
  }
  out() {
    if (this.selected) return;
    this.marker.setIcon(this.icon.get(this.data.ObjectState).normal);
    this.marker.setzIndex(1);
  }
  select() {
    if (this.selected) return;
    this.selected = true;
    this.marker.setIcon(this.icon.get(this.data.ObjectState).selected);
    this.marker.setzIndex(3);
  }
  blur() {
    if (!this.selected) return;
    this.selected = false;
    this.marker.setIcon(this.icon.get(this.data.ObjectState).normal);
    this.marker.setzIndex(1);
  }
}
