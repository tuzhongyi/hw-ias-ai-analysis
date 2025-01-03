import AMapLoader from '@amap/amap-jsapi-loader';
import { Injectable } from '@angular/core';
import { MapHelper } from '../../../../../common/helper/map/map.helper';
import { wait } from '../../../../../common/tools/wait';
import { SystemTaskFileDetailsAMapArrowController } from './system-task-file-details-amap-arrow.controller';
import { SystemTaskFileDetailsAMapLabelController } from './system-task-file-details-amap-label.controller';
import { SystemTaskFileDetailsAMapPathWayController } from './system-task-file-details-amap-path-way.controller';
import { SystemTaskFileDetailsAMapPathController } from './system-task-file-details-amap-path.controller';

@Injectable()
export class SystemTaskFileDetailsAMapController {
  arrow: Promise<SystemTaskFileDetailsAMapArrowController>;
  path: Promise<SystemTaskFileDetailsAMapPathController>;
  way: Promise<SystemTaskFileDetailsAMapPathWayController>;
  label: Promise<SystemTaskFileDetailsAMapLabelController>;

  constructor() {
    this.init.map().then((AMap) => {
      this.map = new AMap.Map('map-container', {
        mapStyle: MapHelper.amap.style,
        resizeEnable: true,
        showIndoorMap: false,
        zoom: 17,
      });
    });

    this.arrow = this.init.arrow();
    this.path = this.init.path();
    this.way = this.init.way();
    this.label = this.init.label();
  }

  private map: any;

  private _arrow?: SystemTaskFileDetailsAMapArrowController;
  private _path?: SystemTaskFileDetailsAMapPathController;
  private _way?: SystemTaskFileDetailsAMapPathWayController;
  private _label?: SystemTaskFileDetailsAMapLabelController;

  private init = {
    map: () => {
      (window as any)._AMapSecurityConfig = {
        securityJsCode: MapHelper.amap.code,
      };
      return AMapLoader.load({
        key: MapHelper.amap.key, //申请好的 Web 端开发者 Key，首次调用 load 时必填
        version: '2.0', //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.GeoLocation', 'GeometryUtil'], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['AMap.Scale','...','...']
      });
    },
    arrow: () => {
      return new Promise<SystemTaskFileDetailsAMapArrowController>(
        (resolve) => {
          if (this._arrow) {
            resolve(this._arrow);
          } else {
            wait(
              () => {
                return !!this.map;
              },
              () => {
                this._arrow = new SystemTaskFileDetailsAMapArrowController(
                  this.map
                );
                resolve(this._arrow);
              }
            );
          }
        }
      );
    },
    path: () => {
      return new Promise<SystemTaskFileDetailsAMapPathController>((resolve) => {
        if (this._path) {
          resolve(this._path);
        } else {
          wait(
            () => {
              return !!this.map;
            },
            () => {
              this._path = new SystemTaskFileDetailsAMapPathController(
                this.map
              );
              resolve(this._path);
            }
          );
        }
      });
    },
    way: () => {
      return new Promise<SystemTaskFileDetailsAMapPathWayController>(
        (resolve) => {
          if (this._way) {
            resolve(this._way);
          } else {
            wait(
              () => {
                return !!this.map;
              },
              () => {
                this._way = new SystemTaskFileDetailsAMapPathWayController(
                  this.map
                );
                resolve(this._way);
              }
            );
          }
        }
      );
    },
    label: () => {
      return new Promise<SystemTaskFileDetailsAMapLabelController>(
        (resolve) => {
          if (this._label) {
            resolve(this._label);
          } else {
            wait(
              () => {
                return !!this.map;
              },
              () => {
                this._label = new SystemTaskFileDetailsAMapLabelController(
                  this.map
                );
                resolve(this._label);
              }
            );
          }
        }
      );
    },
  };
}
