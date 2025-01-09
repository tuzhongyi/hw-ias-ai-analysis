import { EventEmitter, Injectable } from '@angular/core';
import { Shop } from '../../../../../common/data-core/models/arm/analysis/shop.model';
import { GisPoint } from '../../../../../common/data-core/models/arm/gis-point.model';
import { MapHelper } from '../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../common/models/value.promise';
import { SystemAMapLayerController } from './system-map-amap-layer.controller';

import {
  SystemAMapCircleController,
  SystemAMapCircleEvent,
} from './system-map-amap-circle.controller';

@Injectable()
export class SystemAMapController {
  event = {
    map: {
      mousemmove: new EventEmitter<number[]>(),
    },
    editor: {
      circle: new SystemAMapCircleEvent(),
    },
  };

  constructor() {
    MapHelper.amap
      .get('map-container', [...MapHelper.amap.plugins, 'AMap.CircleEditor'])
      .then((x) => {
        this.map.set(x);
      });
    this.regist();
  }

  private map = new PromiseValue<any>();
  private layer = new PromiseValue<SystemAMapLayerController>();
  private circle = new PromiseValue<SystemAMapCircleController>();

  private regist() {
    this.map.get().then((x) => {
      x.on('complete', () => {
        this.layer.set(new SystemAMapLayerController(x));
        let circel = new SystemAMapCircleController(x);
        circel.event.change.subscribe((x) => {
          this.event.editor.circle.change.emit(x);
        });
        circel.event.move.subscribe((x) => {
          this.event.editor.circle.move.emit(x);
        });
        this.circle.set(circel);
      });
      x.on('mousemove', (e: any) => {
        this.event.map.mousemmove.emit([e.lnglat.lng, e.lnglat.lat]);
      });
    });
  }

  load(datas: Shop[]) {
    this.layer.get().then((x) => {
      x.clear();
      x.load(datas).then(() => {
        this.map.get().then((y) => {
          y.setFitView(null, true);
        });
      });
    });
  }

  init(position: GisPoint) {
    this.map.get().then((x) => {
      let center = [position.Longitude, position.Latitude];
      x.setCenter(center);
      x.setZoom(17);
    });
  }

  radius = {
    open: () => {
      this.circle.get().then((x) => {
        x.create();
        x.open();
      });
    },
    close: () => {
      this.circle.get().then((x) => {
        x.remove();
        x.close();
      });
    },
  };
}
