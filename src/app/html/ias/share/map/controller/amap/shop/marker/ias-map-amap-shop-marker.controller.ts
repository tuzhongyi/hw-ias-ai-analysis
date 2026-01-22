import { EventEmitter } from '@angular/core';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { IIASMapArgs } from '../../../../ias-map.model';
import { IASMapAMapIconController } from './ias-map-amap-shop-icon.controller';

export class IASMapAMapMarkerController {
  event = {
    dragend: new EventEmitter<[number, number]>(),
  };
  private icon = new IASMapAMapIconController();

  private marker = new PromiseValue<AMap.Marker>();
  position: [number, number] = [0, 0];
  async get() {
    if (this.marker.exists) {
      return this.marker.get();
    }
    return undefined;
  }
  set(position: [number, number], args: IIASMapArgs, draggable = false) {
    this.position = [...position];
    let icon = this.icon.get(args.type, args.color);
    let marker = new AMap.Marker({
      position: this.position,
      draggable: draggable,
      icon: icon,
      offset: this.icon.offset,
    });
    this.regist(marker);

    this.marker.set(marker);

    return marker;
  }

  private regist(marker: AMap.Marker) {
    marker.on('mouseover', () => {
      this.mouse.over();
    });
    marker.on('mouseout', () => {
      this.mouse.out();
    });
    marker.on('dragend', (e) => {
      let position: [number, number] = [e.lnglat.lng, e.lnglat.lat];
      this.event.dragend.emit(position);
    });
  }

  mouse = {
    over: () => {
      this.marker.get().then((x) => {
        let icon = this.icon.mouse.over();
        x.setIcon(icon);
      });
    },
    out: () => {
      this.marker.get().then((x) => {
        let icon = this.icon.mouse.out();
        x.setIcon(icon);
      });
    },
  };

  select() {
    this.marker.get().then((x) => {
      let icon = this.icon.select(true);
      x.setIcon(icon);
    });
  }
}
