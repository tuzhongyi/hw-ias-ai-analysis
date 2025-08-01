import { EventEmitter, Injectable } from '@angular/core';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';

import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { MapHelper } from '../../../../../../../common/helper/map/map.helper';
import { PathTool } from '../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { PromiseValue } from '../../../../../../../common/view-models/value.promise';
import { SystemModuleShopDetailsAMapPointController } from './point/system-module-shop-details-amap-point.controller';

@Injectable()
export class SystemModuleShopDetailsAMapController {
  dragging = new EventEmitter<number[]>();
  dragend = new EventEmitter<number[]>();

  constructor() {
    MapHelper.amap
      .get('system-module-shop-details-map-container', undefined, true)
      .then((x) => {
        this.map.set(x);
        let loca = new Loca.Container({ map: x });
        let point = new SystemModuleShopDetailsAMapPointController(loca);
        this.controller.point.set(point);
      });
  }

  private map = new PromiseValue<AMap.Map>();
  private marker = new PromiseValue<AMap.Marker>();

  private controller = {
    point: new PromiseValue<SystemModuleShopDetailsAMapPointController>(),
  };

  private _load(data: GisPoint) {
    let position: [number, number] = [data.Longitude, data.Latitude];
    let size: [number, number] = [
      SizeTool.map.shop.width * 0.7,
      SizeTool.map.shop.height * 0.7,
    ];
    let icon = new AMap.Icon({
      imageSize: size,

      size: size,
      image: PathTool.image.map.shop.blue.normal,
      anchor: 'bottom-center',
    });
    let marker = new AMap.Marker({
      position: position,
      draggable: true,
      icon: icon,
      offset: new AMap.Pixel(-size[0] / 2, -size[1]),
    });
    marker.on('dragging', (e: any) => {
      let position = [e.lnglat.lng, e.lnglat.lat];
      this.dragging.emit(position);
    });
    marker.on('dragend', (e: any) => {
      let position = [e.lnglat.lng, e.lnglat.lat];
      this.dragend.emit(position);
    });

    this.marker.set(marker);
    this.map.get().then((x) => {
      x.add(marker);
      x.setCenter(position);
    });
  }

  async load(data: GisPoint) {
    let map = await this.map.get();
    if (this.marker.exists) {
      let marker = await this.marker.get();
      map.remove(marker);
    }
    this._load(data);
  }

  destroy() {
    this.map.get().then((x) => {
      x.destroy();
      this.map.clear();
    });
  }

  point = {
    load: (datas: IShop[]) => {
      this.controller.point.get().then((x) => {
        x.clear();
        if (datas.length > 0) {
          x.load(datas);
        }
      });
    },
  };
}
