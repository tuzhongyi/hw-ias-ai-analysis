import { EventEmitter, Injectable } from '@angular/core';
import { GisPoint } from '../../../../../common/data-core/models/arm/gis-point.model';
import { wait } from '../../../../../common/tools/wait';

import { MapHelper } from '../../../../../common/helper/map/map.helper';

declare var AMap: any;

@Injectable()
export class SystemModuleShopDetailsAMapController {
  dragging = new EventEmitter<number[]>();
  dragend = new EventEmitter<number[]>();

  constructor() {
    MapHelper.amap.init().then((AMap) => {
      this.map = new AMap.Map('map-container', {
        mapStyle: MapHelper.amap.style,
        resizeEnable: true,
        zoom: 17,
      });
      this.regist(this.map);
    });
  }

  private map: any;
  private inited = false;
  private marker: any;

  private regist(map: any) {
    map.on('complete', () => {
      this.inited = true;
    });
  }
  private _load(data: GisPoint) {
    let position = [data.Longitude, data.Latitude];
    this.marker = new AMap.Marker({
      position: position,
      map: this.map,
      draggable: true,
    });
    this.marker.on('dragging', (e: any) => {
      let position = [e.lnglat.lng, e.lnglat.lat];
      this.dragging.emit(position);
    });
    this.marker.on('dragend', (e: any) => {
      let position = [e.lnglat.lng, e.lnglat.lat];
      this.dragend.emit(position);
    });
    this.map.setCenter(position);
  }

  load(data: GisPoint) {
    wait(
      () => {
        return this.inited;
      },
      () => {
        if (this.marker) {
          this.map.remove(this.marker);
        }
        this._load(data);
      }
    );
  }

  destroy() {
    if (this.map) {
      this.map.destroy();
    }
  }
}
