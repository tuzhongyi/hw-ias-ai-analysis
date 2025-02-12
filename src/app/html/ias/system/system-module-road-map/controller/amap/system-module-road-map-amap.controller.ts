import '@amap/amap-jsapi-types';
import { Injectable } from '@angular/core';
import { MapHelper } from '../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../common/view-models/value.promise';

@Injectable()
export class SystemModuleRoadMapAMapController {
  constructor() {
    MapHelper.amap.get('map-container').then((x) => {
      this.map.set(x);
    });
  }

  private map = new PromiseValue<AMap.Map>();
}
