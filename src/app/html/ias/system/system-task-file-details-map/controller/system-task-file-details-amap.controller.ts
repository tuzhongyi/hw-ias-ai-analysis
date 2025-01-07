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
    MapHelper.amap.init().then((AMap) => {
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
