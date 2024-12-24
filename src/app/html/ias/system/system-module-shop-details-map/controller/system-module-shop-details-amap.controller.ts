import AMapLoader from '@amap/amap-jsapi-loader';
import { EventEmitter, Injectable } from '@angular/core';
import { GisPoint } from '../../../../../common/data-core/models/arm/gis-point.model';
import { wait } from '../../../../../common/tools/wait';

import '../../../../../../assets/js/map/CoordinateTransform.js';
import { MapHelper } from '../../../../../common/helper/map/map.helper';
declare var wgs84togcj02: any;
declare var AMap: any;

@Injectable()
export class SystemModuleShopDetailsAMapController {
  dragging = new EventEmitter<number[]>();
  dragend = new EventEmitter<number[]>();

  constructor() {
    this.init().then((AMap) => {
      this.map = new AMap.Map('map-container', {
        mapStyle: MapHelper.amap.style,
        resizeEnable: true,
        zoom: 17,
      });
      this.regist(this.map);
    });
  }

  private map: any;
  private inited = false;

  private init() {
    (window as any)._AMapSecurityConfig = {
      securityJsCode: MapHelper.amap.code,
    };
    return AMapLoader.load({
      key: MapHelper.amap.key, //申请好的 Web 端开发者 Key，首次调用 load 时必填
      version: '1.4.15', //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.GeoLocation', 'GeometryUtil'], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['AMap.Scale','...','...']
    });
  }

  private regist(map: any) {
    map.on('complete', () => {
      this.inited = true;
    });
  }
  private _load(data: GisPoint) {
    let position = wgs84togcj02(data.Longitude, data.Latitude);
    let marker = new AMap.Marker({
      position: position,
      map: this.map,
      draggable: true,
    });
    marker.on('dragging', (e: any) => {
      let position = [e.lnglat.lng, e.lnglat.lat];
      this.dragging.emit(position);
    });
    marker.on('dragend', (e: any) => {
      let position = [e.lnglat.lng, e.lnglat.lat];
      this.dragend.emit(position);
    });
    this.map.setCenter(position);
  }

  load(data: GisPoint) {
    wait(
      () => {
        return this.inited;
      },
      () => {
        this._load(data);
      }
    );
  }
}
