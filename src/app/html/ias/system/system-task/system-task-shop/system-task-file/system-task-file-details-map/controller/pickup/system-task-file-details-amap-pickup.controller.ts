import { EventEmitter } from '@angular/core';
import { IASMapAMapIconController } from '../../../../../../../share/map/controller/amap/shop/marker/ias-map-amap-shop-icon.controller';
import {
  MapMarkerColor,
  MapMarkerType,
} from '../../../../../../../share/map/ias-map.model';
import { SystemTaskFileDetailsAMapPickupMarkerController } from './system-task-file-details-amap-pickup-marker.controller';

export class SystemTaskFileDetailsAMapPickupController {
  event = {
    dragend: new EventEmitter<[number, number]>(),
  };

  constructor(private map: AMap.Map) {
    this.regist();
  }

  icon = new IASMapAMapIconController();
  marker = new SystemTaskFileDetailsAMapPickupMarkerController();

  create(position: [number, number]) {
    let args = {
      type: MapMarkerType.shop,
      color: MapMarkerColor.green,
    };
    let marker = this.marker.set(position, args, true);
    this.map.add(marker);
  }

  async remove() {
    let marker = await this.marker.get();
    if (marker) {
      this.map.remove(marker);
    }
  }

  private regist() {
    this.marker.event.dragend.subscribe((x) => {
      this.event.dragend.emit(x);
    });
  }
}
