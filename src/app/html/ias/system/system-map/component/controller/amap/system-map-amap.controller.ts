import { EventEmitter, Injectable } from '@angular/core';
import { Shop } from '../../../../../../../common/data-core/models/arm/analysis/shop.model';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { MapHelper } from '../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../common/view-models/value.promise';

import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';
import {
  SystemAMapCircleEditorController,
  SystemAMapCircleEditorEvent,
} from './circle/system-map-amap-circle-editor.controller';
import { SystemAMapShopMarkerLayerController } from './marker/system-map-amap-shop-marker-layer.controller';
import { SystemAMapShopMarkerEvent } from './marker/system-map-amap-shop-marker.model';
import { SystemAMapShopPointLayerController } from './point/system-map-amap-shop-point-layer.controller';
import { SystemMapAMapRoadLabelController } from './road/system-map-amap-road-label.controller';
import { SystemMapAMapRoadPolylineController } from './road/system-map-amap-road-polyline.controller';
import { SystemMapAMapConfig } from './system-map-amap.config';

@Injectable()
export class SystemMapAMapController {
  event = {
    map: {
      mousemmove: new EventEmitter<number[]>(),
      completed: new EventEmitter<[number, number]>(),
    },
    circle: new SystemAMapCircleEditorEvent(),
    point: new SystemAMapShopMarkerEvent(),
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
  private layer = {
    marker: new PromiseValue<SystemAMapShopMarkerLayerController>(),
    point: new PromiseValue<SystemAMapShopPointLayerController>(),
  };
  private circle = new PromiseValue<SystemAMapCircleEditorController>();
  private _road = {
    polyline: new PromiseValue<SystemMapAMapRoadPolylineController>(),
    label: new PromiseValue<SystemMapAMapRoadLabelController>(),
  };

  private init(map: AMap.Map, container: Loca.Container) {
    let center = map.getCenter();
    this.event.map.completed.emit([center.lng, center.lat]);
    this.regist.map(map);
    this.regist.layer.marker(map);
    this.regist.layer.point(container);
    this.regist.circle(map);
    this.regist.polyline(map);
    this.regist.label(map);
  }

  private regist = {
    map: (map: AMap.Map) => {
      map.on('mousemove', (e: any) => {
        let position_ll: [number, number] = [e.lnglat.lng, e.lnglat.lat];
        this.event.map.mousemmove.emit(position_ll);
        let position_pixel: [number, number] = [e.pixel.x, e.pixel.y];
        this.layer.point.get().then((x) => {
          x.moving(position_pixel);
        });
      });
      map.on('zoomchange', (e: any) => {
        let map = e.target as AMap.Map;
        let zoom = map.getZoom();
        this.layer.marker.get().then((x) => {
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
          this.layer.marker.set(marker);
        } catch (error) {
          console.error(error);
        }
      },
      point: (container: Loca.Container) => {
        let point = new SystemAMapShopPointLayerController(container);
        point.event.move.subscribe((x) => {
          console.log(x);
        });
        this.layer.point.set(point);
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
        this.circle.set(circel);
      } catch (error) {
        console.error(error);
      }
    },
    polyline: (map: AMap.Map) => {
      try {
        let polyline = new SystemMapAMapRoadPolylineController(map);
        this._road.polyline.set(polyline);
      } catch (error) {
        console.error(error);
      }
    },
    label: (map: AMap.Map) => {
      try {
        let label = new SystemMapAMapRoadLabelController(map);
        this._road.label.set(label);
      } catch (error) {
        console.error(error);
      }
    },
  };

  shop = {
    load: (datas: IShop[]) => {
      this.layer.marker.get().then((x) => {
        x.clear();
        x.load(datas);
      });
      this.layer.point.get().then((x) => {
        x.clear();
        x.load(datas);
      });
    },
    hover: (shop: IShop) => {
      this.layer.marker.get().then((x) => {
        x.mouseover(shop);
      });
    },
    out: (shop: IShop) => {
      this.layer.marker.get().then((x) => {
        x.mouseout(shop);
      });
    },
    select: (shop: IShop) => {
      this.layer.marker.get().then((x) => {
        x.select(shop);
      });
    },
    blur: () => {
      this.layer.marker.get().then((x) => {
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
      let polyline = await this._road.polyline.get();
      let label = await this._road.label.get();
      let map = await this.amap.get();

      datas.forEach((data) => {
        if (data.GeoLine) {
          let points = data.GeoLine.map<[number, number]>((x) => [
            x.Longitude,
            x.Latitude,
          ]);
          polyline.add(data.Id, points);
          label.add(data);
        }
      });
      map.setFitView(undefined, true);
      this.road.loaded = true;
    },
    reload: async (datas: Road[]) => {
      let polyline = await this._road.polyline.get();
      let label = await this._road.label.get();
      let ids = datas.map((x) => x.Id);
      polyline.blur();
      label.ignore(ids);
      polyline.ignore(ids);
    },
    select: (road: Road) => {
      this._road.polyline.get().then((x) => {
        x.select(road.Id);
      });
    },
    blur: () => {
      this._road.polyline.get().then((x) => {
        x.blur();
      });
    },
    focus: (road: Road) => {
      this._road.polyline.get().then((x) => {
        x.focus(road.Id);
      });
    },
  };

  distance = {
    opened: false,
    open: () => {
      if (this.distance.opened) return;
      this.circle.get().then((x) => {
        x.circle.create();
        x.open();
        this.distance.opened = true;
      });
    },
    close: () => {
      if (!this.distance.opened) return;
      this.circle.get().then((x) => {
        x.circle.remove();
        x.close();
        this.distance.opened = false;
      });
    },
    radius: (value: number) => {
      this.circle.get().then((x) => {
        x.set({ radius: value });
      });
    },
    center: (value: [number, number]) => {
      this.circle.get().then((x) => {
        x.set({ center: value });
      });
    },
  };

  map = {
    center: (position: GisPoint) => {
      this.amap.get().then((x) => {
        let center: [number, number] = [position.Longitude, position.Latitude];
        x.setCenter(center);
        x.setZoom(SystemMapAMapConfig.icon.zooms[0] + 1);
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
