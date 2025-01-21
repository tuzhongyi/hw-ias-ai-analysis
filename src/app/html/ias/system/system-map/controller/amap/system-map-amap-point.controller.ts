import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { SystemAMapPointIconController } from './system-map-amap-point-icon.controller';

import { EventEmitter } from '@angular/core';

export class SystemAMapPointEvent {
  mouseover = new EventEmitter<Shop>();
  mouseout = new EventEmitter<Shop>();
  click = new EventEmitter<Shop>();
}

export class SystemAMapPointController {
  event = new SystemAMapPointEvent();

  marker: AMap.LabelMarker;
  selected = false;

  get data(): Shop {
    return this.marker.getExtData();
  }
  constructor(data: Shop) {
    this.marker = this.create(data);
  }

  private icon = new SystemAMapPointIconController();

  private create(data: Shop) {
    if (data.Location) {
      let position = [data.Location.Longitude, data.Location.Latitude];
      let marker = new AMap.LabelMarker({
        icon: this.icon.normal,
        position: [...position],
        title: data.Name,
        name: data.Id,
        extData: data,
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
    this.marker.setIcon(this.icon.hover);
    this.marker.setzIndex(2);
  }
  out() {
    if (this.selected) return;
    this.marker.setIcon(this.icon.normal);
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
    this.marker.setIcon(this.icon.normal);
    this.marker.setzIndex(1);
  }
}
