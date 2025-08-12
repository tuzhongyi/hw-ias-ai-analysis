import { Injectable } from '@angular/core';
import { IShop } from '../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { Road } from '../../../../../../common/data-core/models/arm/geographic/road.model';
import { SystemMainMapAMapController } from './amap/system-main-map-amap.controller';

@Injectable()
export class SystemMainMapController {
  constructor() {}

  private amap = new SystemMainMapAMapController();

  point = {
    load: (datas: IShop[]) => {
      this.amap.point.get().then((x) => {
        x.load(datas);
      });
      this.amap.marker.get().then((ctr) => {
        ctr.load(datas);
      });
    },
    clear: async () => {
      return this.amap.point.clear();
    },
  };
  road = {
    load: (datas: Road[]) => {
      this.amap.road.get().then((x) => {
        x.load(datas);
      });
    },
  };
  map = {
    focus: () => {
      this.amap.focus();
    },
  };
}
