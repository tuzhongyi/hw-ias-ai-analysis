import { EventEmitter, Injectable } from '@angular/core';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { MapHelper } from '../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../common/view-models/value.promise';
import { SystemAMapShopMarkerLayerController } from './system-map-amap-shop-marker-layer.controller';

import { Road } from '../../../../../../common/data-core/models/arm/analysis/road.model';
import {
  SystemAMapCircleEditorController,
  SystemAMapCircleEditorEvent,
} from './system-map-amap-circle-editor.controller';
import { SystemMapAMapRoadLabelController } from './system-map-amap-road-label.controller';
import { SystemMapAMapRoadPolylineController } from './system-map-amap-road-polyline.controller';
import { SystemAMapShopMarkerEvent } from './system-map-amap-shop-marker.controller';

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
      .get('map-container', [
        ...MapHelper.amap.plugins,
        'AMap.CircleEditor',
        'AMap.Adaptor',
      ])
      .then((x) => {
        x.setFeatures(['bg', 'road', 'building']);
        this.map.set(x);
        this.init(x);
      });
  }

  private map = new PromiseValue<AMap.Map>();
  private layer = new PromiseValue<SystemAMapShopMarkerLayerController>();
  private circle = new PromiseValue<SystemAMapCircleEditorController>();
  private _road = {
    polyline: new PromiseValue<SystemMapAMapRoadPolylineController>(),
    label: new PromiseValue<SystemMapAMapRoadLabelController>(),
  };

  private init(map: AMap.Map) {
    let center = map.getCenter();
    this.event.map.completed.emit([center.lng, center.lat]);
    this.regist.map(map);
    this.regist.layer(map);
    this.regist.circle(map);
    this.regist.polyline(map);
    this.regist.label(map);
  }

  private regist = {
    map: (map: AMap.Map) => {
      map.on('mousemove', (e: any) => {
        this.event.map.mousemmove.emit([e.lnglat.lng, e.lnglat.lat]);
      });
    },
    layer: (map: AMap.Map) => {
      try {
        let layer = new SystemAMapShopMarkerLayerController(map);
        layer.event.mouseover.subscribe((x) => {
          this.event.point.mouseover.emit(x);
        });
        layer.event.mouseout.subscribe((x) => {
          this.event.point.mouseout.emit(x);
        });
        layer.event.click.subscribe((x) => {
          this.event.point.click.emit(x);
        });
        this.layer.set(layer);
      } catch (error) {
        console.error(error);
      }
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

  center(position: GisPoint) {
    this.map.get().then((x) => {
      let center: [number, number] = [position.Longitude, position.Latitude];
      x.setCenter(center);
      x.setZoom(18);
    });
  }

  shop = {
    load: (datas: Shop[]) => {
      this.layer.get().then((x) => {
        x.clear();
        x.load(datas);
      });
    },
    hover: (shop: Shop) => {
      this.layer.get().then((x) => {
        x.mouseover(shop);
      });
    },
    out: (shop: Shop) => {
      this.layer.get().then((x) => {
        x.mouseout(shop);
      });
    },
    select: (shop: Shop) => {
      this.layer.get().then((x) => {
        x.select(shop);
      });
    },
    blur: () => {
      this.layer.get().then((x) => {
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
      let map = await this.map.get();

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

  onselected(data: Shop) {}

  destroy() {
    this.map.get().then((x) => {
      x.destroy();
    });
  }
}
