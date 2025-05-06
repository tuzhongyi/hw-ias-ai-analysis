import { Injectable } from '@angular/core';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { MapHelper } from '../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../common/view-models/value.promise';

@Injectable()
export class SystemEventMapAMapController {
  constructor() {
    MapHelper.amap
      .get('map-container', [...MapHelper.amap.plugins, 'AMap.PolylineEditor'])
      .then((x) => {
        this.map.set(x);
      });
  }

  private map = new PromiseValue<AMap.Map>();

  private marker = new PromiseValue<AMap.Marker>();

  private _load(data: GisPoint) {
    let position: [number, number] = [data.Longitude, data.Latitude];
    let size: [number, number] = [51 * 0.7, 70 * 0.7];
    let icon = new AMap.Icon({
      imageSize: size,

      size: size,
      image: '/assets/image/map/marker-red.png',
      anchor: 'bottom-center',
    });
    let marker = new AMap.Marker({
      position: position,
      draggable: true,
      icon: icon,
      offset: new AMap.Pixel(-size[0] / 2, -size[1]),
    });

    this.marker.set(marker);
    this.map.get().then((x) => {
      x.add(marker);
      x.setCenter(position);
    });
  }

  async load(data: GisPoint) {
    let map = await this.map.get();
    if (this.marker.exists) {
      let marker = await this.marker.get();
      map.remove(marker);
    }
    this._load(data);
  }

  destroy() {
    this.map.get().then((x) => {
      x.destroy();
    });
  }
}
