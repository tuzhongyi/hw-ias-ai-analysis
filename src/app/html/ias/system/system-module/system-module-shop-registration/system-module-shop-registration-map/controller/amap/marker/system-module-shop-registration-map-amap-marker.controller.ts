import { EventEmitter } from '@angular/core';
import { IShop } from '../../../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { ShopRegistration } from '../../../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { ObjectTool } from '../../../../../../../../../common/tools/object-tool/object.tool';
import { SystemAMapShopMarkerEvent } from '../../../../../../system-map/component/controller/amap/marker/system-map-amap-shop-marker.model';
import { SystemMapAMapConfig } from '../../../../../../system-map/component/controller/amap/system-map-amap.config';
import { SystemModuleShopRegistrationMapAMapMarkerIconController } from './system-module-shop-registration-map-amap-marker-icon.controller';

export class SystemModuleShopRegistrationMapAMapMarkerEvent extends SystemAMapShopMarkerEvent {
  dragging = new EventEmitter<IShop>();
  dragend = new EventEmitter<IShop>();
}

export class SystemModuleShopRegistrationMapAMapMarkerController {
  event = new SystemModuleShopRegistrationMapAMapMarkerEvent();
  marker: AMap.Marker;
  selected = false;
  data: IShop;

  constructor(data: IShop) {
    this.marker = this.create(data);
    this.data = ObjectTool.copy(data, ShopRegistration, ['Location']);
  }

  protected icon =
    new SystemModuleShopRegistrationMapAMapMarkerIconController();

  private create(data: IShop) {
    if (data.Location) {
      let position: [number, number] = [
        data.Location.Longitude,
        data.Location.Latitude,
      ];
      let marker = new AMap.Marker({
        icon: this.icon.icon,
        position: [...position],
        title: data.Name,
        zooms: SystemMapAMapConfig.icon.zooms,
        offset: [-(this.icon.size[0] / 2), -this.icon.size[1]],
        draggable: true,
        cursor: 'move',
      });
      this.regist(marker);
      return marker;
    }
    throw new Error('Location is not defined');
  }

  private regist(marker: AMap.Marker) {
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
    marker.on('dragging', (e: any) => {
      if (this.data.Location) {
        let position = e.target.getPosition() as AMap.LngLat;
        this.data.Location.Longitude = position.lng;
        this.data.Location.Latitude = position.lat;
        this.event.dragging.emit(this.data);
      }
    });
    marker.on('dragend', (e: any) => {
      if (this.data.Location) {
        let position = e.target.getPosition() as AMap.LngLat;
        this.data.Location.Longitude = position.lng;
        this.data.Location.Latitude = position.lat;
        this.event.dragend.emit(this.data);
      }
    });
  }

  hover() {
    if (this.selected) return;

    this.marker.setIcon(this.icon.over);
    this.marker.setzIndex(2);
  }
  out() {
    if (this.selected) return;
    this.marker.setIcon(this.icon.out);
    this.marker.setzIndex(1);
  }
  select() {
    if (this.selected) return;
    this.selected = true;
    this.marker.setIcon(this.icon.selected);
    this.marker.setzIndex(3);
  }
  blur() {
    if (!this.selected) return;
    this.selected = false;
    this.marker.setIcon(this.icon.out);
    this.marker.setzIndex(1);
  }
}
