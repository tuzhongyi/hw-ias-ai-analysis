import { Injectable } from '@angular/core';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { MapHelper } from '../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../common/view-models/value.promise';
import { IASMapAMapInfoController } from '../../../../../share/map/controller/amap/info/ias-map-amap-info.controller';
import { IIASMapAMapInfo } from '../../../../../share/map/controller/amap/info/ias-map-amap-info.model';
import { IASMapAMapPointLayerController } from '../../../../../share/map/controller/amap/point/ias-map-amap-point-layer.controller';
import { IASMapAMapRoadController } from '../../../../../share/map/controller/amap/road/ias-map-amap-road.controller';
import { SystemMainMapAMapMarkerLayerController } from './marker/system-main-map-amap-marker-layer.controller';

@Injectable()
export class SystemMainMapAMapController {
  get point() {
    return this.controller.point;
  }
  get road() {
    return this.controller.road;
  }
  get marker() {
    return this.controller.marker;
  }
  constructor() {
    MapHelper.amap
      .get('system-main-map-container', undefined, true)
      .then((map) => {
        map.setFeatures(['bg', 'road', 'building']);
        this.init.map(map);
        let container = new Loca.Container({ map: map });
        this.loca.set(container);
        this.init.point(container);
        this.init.marker(map);
        this.init.road(map);
        this.init.info(map);
      });
  }

  private map = new PromiseValue<AMap.Map>();
  private loca = new PromiseValue<Loca.Container>();
  private controller = {
    point: new PromiseValue<IASMapAMapPointLayerController>(),
    road: new PromiseValue<IASMapAMapRoadController>(),
    info: new PromiseValue<IASMapAMapInfoController>(),
    marker: new PromiseValue<SystemMainMapAMapMarkerLayerController>(),
  };

  private init = {
    map: (map: AMap.Map) => {
      this.regist.map(map);
      this.map.set(map);
    },
    point: (loca: Loca.Container) => {
      let ctr = new IASMapAMapPointLayerController(loca);
      ctr.event.move.subscribe((data) => {
        this.regist.point.over(data as IShop);
      });
      this.controller.point.set(ctr);
    },
    marker: (map: AMap.Map) => {
      let ctr = new SystemMainMapAMapMarkerLayerController(map);
      this.controller.marker.set(ctr);
    },
    road: (map: AMap.Map) => {
      let ctr = new IASMapAMapRoadController(map);
      this.controller.road.set(ctr);
    },
    info: (map: AMap.Map) => {
      let ctr = new IASMapAMapInfoController(map);
      this.controller.info.set(ctr);
    },
  };
  private regist = {
    map: (map: AMap.Map) => {
      map.on('mousemove', (e: any) => {
        let position: [number, number] = [e.pixel.x, e.pixel.y];
        this.controller.point.get().then((x) => {
          x.moving(position);
        });
      });
    },
    point: {
      over: async (data?: IShop) => {
        this.controller.info.get().then((ctr) => {
          if (data && data.Location) {
            let info: IIASMapAMapInfo = {
              Name: data.Name,
            };
            if (data.Location) {
              info.Location = [
                data.Location.GCJ02.Longitude,
                data.Location.GCJ02.Latitude,
              ];
            }
            ctr.add(info, undefined, [0, -15]);
          } else {
            ctr.remove();
          }
        });
      },
    },
  };

  focus() {
    this.map.get().then((x) => {
      x.setFitView(undefined, true);
    });
  }
}
