import { EventEmitter, Injectable } from '@angular/core';
import { Shop } from '../../../../../../../common/data-core/models/arm/analysis/shop.model';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { MapHelper } from '../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../common/view-models/value.promise';

import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';
import { IASMapAMapConfig } from '../../../../../share/map/controller/amap/ias-map-amap.config';
import { IASMapAMapMarkerEvent } from '../../../../../share/map/controller/amap/marker/ias-map-amap-marker.model';
import { IASMapAMapPointLayerController } from '../../../../../share/map/controller/amap/point/ias-map-amap-point-layer.controller';
import { IASMapAMapRoadController } from '../../../../../share/map/controller/amap/road/ias-map-amap-road.controller';
import {
  SystemAMapCircleEditorController,
  SystemAMapCircleEditorEvent,
} from './circle/system-map-amap-circle-editor.controller';
import { SystemAMapShopMarkerLayerController } from './marker/system-map-amap-shop-marker-layer.controller';

@Injectable()
export class SystemMapAMapController {
  event = {
    map: {
      mousemmove: new EventEmitter<number[]>(),
      completed: new EventEmitter<[number, number]>(),
    },
    circle: new SystemAMapCircleEditorEvent(),
    point: new IASMapAMapMarkerEvent(),
  };

  constructor() {
    MapHelper.amap
      .get(
        'system-map',
        [...MapHelper.amap.plugins, 'AMap.CircleEditor', 'AMap.Adaptor'],
        true
      )
      .then((x) => {
        x.setFeatures(['bg', 'road', 'building']);
        this.amap.set(x);
        let container = new Loca.Container({ map: x });
        this.loca.set(container);
        this.init(x, container);
      });
  }

  private amap = new PromiseValue<AMap.Map>();
  private loca = new PromiseValue<Loca.Container>();
  private controller = {
    layer: {
      marker: new PromiseValue<SystemAMapShopMarkerLayerController>(),
      point: new PromiseValue<IASMapAMapPointLayerController>(),
    },
    circle: new PromiseValue<SystemAMapCircleEditorController>(),
    road: new PromiseValue<IASMapAMapRoadController>(),
  };
  private init(map: AMap.Map, container: Loca.Container) {
    let center = map.getCenter();
    this.event.map.completed.emit([center.lng, center.lat]);
    this.regist.map(map);
    this.regist.layer.marker(map);
    this.regist.layer.point(container);
    this.regist.circle(map);
    this.regist.road(map, container);
  }

  private regist = {
    map: (map: AMap.Map) => {
      map.on('mousemove', (e: any) => {
        let position_ll: [number, number] = [e.lnglat.lng, e.lnglat.lat];
        this.event.map.mousemmove.emit(position_ll);
        let position_pixel: [number, number] = [e.pixel.x, e.pixel.y];
        this.controller.layer.point.get().then((x) => {
          x.moving(position_pixel);
        });
      });
      map.on('zoomchange', (e: any) => {
        let map = e.target as AMap.Map;
        let zoom = map.getZoom();
        this.controller.layer.marker.get().then((x) => {
          x.set.zoom(zoom);
        });
      });
    },
    layer: {
      marker: (map: AMap.Map) => {
        try {
          let marker = new SystemAMapShopMarkerLayerController(map);
          marker.event.mouseover.subscribe((x) => {
            this.event.point.mouseover.emit(x);
          });
          marker.event.mouseout.subscribe((x) => {
            this.event.point.mouseout.emit(x);
          });
          marker.event.click.subscribe((x) => {
            this.event.point.click.emit(x);
          });
          this.controller.layer.marker.set(marker);
        } catch (error) {
          console.error(error);
        }
      },
      point: (container: Loca.Container) => {
        let point = new IASMapAMapPointLayerController(container);
        point.event.move.subscribe((x) => {
          console.log(x);
        });
        this.controller.layer.point.set(point);
      },
    },
    circle: (map: AMap.Map) => {
      try {
        let circel = new SystemAMapCircleEditorController(map);
        circel.event.opened.subscribe((x) => {
          this.event.circle.opened.emit(x);
        });
        circel.event.change.subscribe((x) => {
          this.event.circle.change.emit(x);
        });
        circel.event.move.subscribe((x) => {
          this.event.circle.move.emit(x);
        });
        this.controller.circle.set(circel);
      } catch (error) {
        console.error(error);
      }
    },
    road: (map: AMap.Map, loca: Loca.Container) => {
      try {
        let road = new IASMapAMapRoadController(map, loca);
        this.controller.road.set(road);
      } catch (error) {
        console.error(error);
      }
    },
  };

  shop = {
    load: (datas: IShop[]) => {
      this.controller.layer.marker.get().then((x) => {
        x.clear();
        x.load(datas);
      });
      this.controller.layer.point.get().then((x) => {
        x.clear();
        x.load(datas);
      });
    },
    hover: (shop: IShop) => {
      this.controller.layer.marker.get().then((x) => {
        x.mouseover(shop);
      });
    },
    out: (shop: IShop) => {
      this.controller.layer.marker.get().then((x) => {
        x.mouseout(shop);
      });
    },
    select: (shop: IShop) => {
      this.controller.layer.marker.get().then((x) => {
        x.select(shop);
      });
    },
    blur: () => {
      this.controller.layer.marker.get().then((x) => {
        x.blur();
      });
    },
  };

  road = {
    loaded: false,
    load: async (datas: Road[]) => {
      if (this.road.loaded) {
        this.road.reload(datas);
        return;
      }
      let road = await this.controller.road.get();
      let map = await this.amap.get();

      road.load(datas);
      map.setFitView(undefined, true);
      this.road.loaded = true;
    },
    reload: async (datas: Road[]) => {
      let road = await this.controller.road.get();
      road.reload(datas);
    },
    select: (road: Road) => {
      this.controller.road.get().then((x) => {
        x.select(road);
      });
    },
    blur: () => {
      this.controller.road.get().then((x) => {
        x.blur();
      });
    },
    focus: (road: Road) => {
      this.controller.road.get().then((x) => {
        x.focus(road);
      });
    },
  };

  distance = {
    opened: false,
    open: () => {
      if (this.distance.opened) return;
      this.controller.circle.get().then((x) => {
        x.circle.create();
        x.open();
        this.distance.opened = true;
      });
    },
    close: () => {
      if (!this.distance.opened) return;
      this.controller.circle.get().then((x) => {
        x.circle.remove();
        x.close();
        this.distance.opened = false;
      });
    },
    radius: (value: number) => {
      this.controller.circle.get().then((x) => {
        x.set({ radius: value });
      });
    },
    center: (value: [number, number]) => {
      this.controller.circle.get().then((x) => {
        x.set({ center: value });
      });
    },
  };

  map = {
    center: (position: GisPoint) => {
      this.amap.get().then((x) => {
        let center: [number, number] = [position.Longitude, position.Latitude];
        x.setCenter(center);
        x.setZoom(IASMapAMapConfig.icon.zooms[0] + 1);
      });
    },
    focus: () => {
      this.amap.get().then((x) => {
        x.setFitView();
      });
    },
  };

  onselected(data: Shop) {}

  destroy() {
    this.amap.get().then((x) => {
      x.destroy();
    });
  }
}
