import AMapLoader from '@amap/amap-jsapi-loader';
import { Injectable } from '@angular/core';
import { ShopSign } from '../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { MapHelper } from '../../../../../common/helper/map/map.helper';
import { wait } from '../../../../../common/tools/wait';
import { SystemTaskResultAMapLayerController } from './system-task-result-amap-layer.controller';

@Injectable()
export class SystemTaskResultAmapController {
  constructor() {
    this.init().then((AMap) => {
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

  private inited = false;
  private loaded = false;
  private layer: any;

  private init() {
    (window as any)._AMapSecurityConfig = {
      securityJsCode: MapHelper.amap.code,
    };
    return AMapLoader.load({
      key: MapHelper.amap.key, //申请好的 Web 端开发者 Key，首次调用 load 时必填
      version: '2.0', //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.GeoLocation', 'GeometryUtil'], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['AMap.Scale','...','...']
    });
  }
  private regist(map: any) {
    map.on('complete', () => {
      this.layer = new SystemTaskResultAMapLayerController(this.map);
      this.inited = true;
    });
  }

  private _load(datas: ShopSign[]) {
    return new Promise<void>((resolve) => {
      this.layer.load(datas).then(() => {
        this.map.setFitView(null, true);
        this.loaded = true;
        resolve();
      });
    });
  }

  select(id: string) {
    wait(
      () => {
        return this.inited && this.loaded;
      },
      () => {
        this.layer.select(id);
      }
    );
  }

  async load(data: ShopSign[]) {
    return new Promise<void>((resolve) => {
      wait(
        () => {
          return this.inited;
        },
        () => {
          this._load(data).then(() => {
            resolve();
          });
        }
      );
    });
  }
}
