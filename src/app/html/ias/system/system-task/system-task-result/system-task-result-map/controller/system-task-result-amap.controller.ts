import { Injectable } from '@angular/core';
import { ShopSign } from '../../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { MapHelper } from '../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../common/view-models/value.promise';
import { SystemTaskResultAMapLayerController } from './system-task-result-amap-layer.controller';

@Injectable()
export class SystemTaskResultAMapController {
  constructor() {
    MapHelper.amap.get('map-container').then((x) => {
      this.map.set(x);
      this.layer.set(new SystemTaskResultAMapLayerController(x));
    });
  }

  private map = new PromiseValue<AMap.Map>();
  private layer = new PromiseValue<SystemTaskResultAMapLayerController>();

  async load(datas: ShopSign[]) {
    return this.layer.get().then((x) => {
      x.clear();
      x.load(datas).then(() => {
        this.map.get().then((x) => {
          x.setFitView(undefined, true);
        });
      });
    });
  }

  async select(id: string) {
    this.layer.get().then((x) => {
      x.loading().then(() => {
        x.select(id);
      });
    });
  }

  destroy() {
    this.map.get().then((x) => {
      x.destroy();
    });
  }
}
