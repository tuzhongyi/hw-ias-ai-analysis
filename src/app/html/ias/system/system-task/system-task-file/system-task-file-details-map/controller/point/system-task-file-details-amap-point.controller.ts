import { EventEmitter } from '@angular/core';
import { IASMapAMapIconController } from '../../../../../../share/map/controller/amap/ias-map-amap-icon.controller';
import { IASMapAMapMarkerController } from '../../../../../../share/map/controller/amap/ias-map-amap-marker.controller';
import {
  MapMarkerShopColor,
  MapMarkerType,
} from '../../../../../../share/map/ias-map.model';

export class SystemTaskFileDetailsAMapPointController {
  event = {
    dragend: new EventEmitter<[number, number]>(),
  };

  constructor(private map: AMap.Map) {
    this.regist();
  }

  icon = new IASMapAMapIconController();
  marker = new IASMapAMapMarkerController();

  create(position: [number, number]) {
    let args = {
      type: MapMarkerType.shop,
      color: MapMarkerShopColor.green,
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
