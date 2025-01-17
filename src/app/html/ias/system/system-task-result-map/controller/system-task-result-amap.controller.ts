import { Injectable } from '@angular/core';
import { ShopSign } from '../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { MapHelper } from '../../../../../common/helper/map/map.helper';
import { wait } from '../../../../../common/tools/wait';
import { SystemTaskResultAMapLayerController } from './system-task-result-amap-layer.controller';

@Injectable()
export class SystemTaskResultAMapController {
  constructor() {
    MapHelper.amap.init().then((AMap) => {
      this.map = new AMap.Map('map-container', {
        mapStyle: MapHelper.amap.style,
        resizeEnable: true,
        showIndoorMap: false,
        zoom: 17,
      });

      this.regist(this.map);
    });
  }

  private map: any;
  private _layer?: SystemTaskResultAMapLayerController;
  private get layer(): Promise<SystemTaskResultAMapLayerController> {
    return new Promise((resolve) => {
      if (this._layer) {
        resolve(this._layer);
        return;
      }
      wait(
        () => {
          return !!this._layer;
        },
        () => {
          if (this._layer) {
            resolve(this._layer);
          }
        }
      );
    });
  }
  private regist(map: any) {
    map.on('complete', () => {
      this._layer = new SystemTaskResultAMapLayerController(this.map);
    });
  }

  async load(datas: ShopSign[]) {
    return this.layer.then((x) => {
      x.clear();
      x.load(datas).then(() => {
        this.map.setFitView(null, true);
      });
    });
  }

  async select(id: string) {
    this.layer.then((x) => {
      x.loading().then(() => {
        x.select(id);
      });
    });
  }

  destroy() {
    if (this.map) {
      this.map.destroy();
    }
  }
}
