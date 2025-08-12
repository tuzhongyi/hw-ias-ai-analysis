import { Injectable } from '@angular/core';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { MapHelper } from '../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../common/view-models/value.promise';
import {
  IIASMapArgs,
  MapMarkerShopColor,
  MapMarkerType,
} from '../../ias-map.model';
import { IASMapAMapMarkerController } from './marker/ias-map-amap-marker.controller';
import { IASMapAMapPointController } from './marker/ias-map-amap-point.controller';

@Injectable()
export class IASMapAMapController {
  constructor() {
    MapHelper.amap
      .get('ias-map', [...MapHelper.amap.plugins, 'AMap.PolylineEditor'])
      .then((x) => {
        this.map.set(x);
      });
  }

  private map = new PromiseValue<AMap.Map>();
  private marker = new IASMapAMapMarkerController();
  private points: IASMapAMapPointController[] = [];

  private _load(data: GisPoint, args: IIASMapArgs, center: boolean) {
    this.map.get().then((x) => {
      let marker = this.marker.set([data.Longitude, data.Latitude], args);
      this.marker.select();
      x.add(marker);
      if (center) {
        x.setCenter(this.marker.position);
      }
    });
  }

  async load(data: GisPoint, args: IIASMapArgs, center: boolean = false) {
    this._load(data, args, center);
  }
  async clear() {
    let map = await this.map.get();
    let marker = await this.marker.get();
    if (marker) {
      map.remove(marker);
    }
  }

  point = {
    load: async (datas: GisPoint[], focus?: boolean) => {
      let map = await this.map.get();
      this.points = datas.map((x) => {
        let point = new IASMapAMapPointController();
        let marker = point.set(x, {
          type: MapMarkerType.shop,
          color: MapMarkerShopColor.blue,
        });
        map.add(marker);
        return point;
      });
      if (focus) {
        setTimeout(() => {
          map.setFitView(undefined, false);
        }, 1000);
      }
    },
    clear: async () => {
      let map = await this.map.get();

      for (let i = 0; i < this.points.length; i++) {
        const point = this.points[i];
        let marker = await point.marker.get();
        map.remove(marker);
      }

      this.points = [];
    },
  };

  destroy() {
    this.map.get().then((x) => {
      x.destroy();
      this.map.clear();
    });
  }
}
