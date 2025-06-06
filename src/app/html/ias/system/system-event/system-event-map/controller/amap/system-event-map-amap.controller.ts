import { Injectable } from '@angular/core';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { MapHelper } from '../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../common/view-models/value.promise';
import {
  ISystemEventMapArgs,
  MapMarkerShopColor,
  MapMarkerType,
} from '../../system-event-map.model';
import { SystemEventMapAMapMarkerController } from './system-event-map-amap-marker.controller';
import { SystemEventMapAMapPointController } from './system-event-map-amap-point.controller';

@Injectable()
export class SystemEventMapAMapController {
  constructor() {
    MapHelper.amap
      .get('system-event-map', [
        ...MapHelper.amap.plugins,
        'AMap.PolylineEditor',
      ])
      .then((x) => {
        this.map.set(x);
      });
  }

  private map = new PromiseValue<AMap.Map>();
  private marker = new SystemEventMapAMapMarkerController();
  private points: SystemEventMapAMapPointController[] = [];

  private _load(data: GisPoint, args: ISystemEventMapArgs) {
    this.map.get().then((x) => {
      let marker = this.marker.set(data, args);
      this.marker.select();
      x.add(marker);
      x.setCenter(this.marker.position);
    });
  }

  async load(data: GisPoint, args: ISystemEventMapArgs) {
    this._load(data, args);
  }

  point = {
    load: (datas: GisPoint[]) => {
      this.map.get().then((map) => {
        this.points = datas.map((x) => {
          let point = new SystemEventMapAMapPointController();
          let marker = point.set(x, {
            type: MapMarkerType.shop,
            color: MapMarkerShopColor.blue,
          });
          map.add(marker);
          return point;
        });
      });
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
    });
  }
}
