import { EventEmitter, Injectable } from '@angular/core';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { MapHelper } from '../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../common/models/value.promise';
import { SystemAMapLayerController } from './system-map-amap-layer.controller';

import {
  SystemAMapCircleEditorController,
  SystemAMapCircleEditorEvent,
} from './system-map-amap-circle-editor.controller';
import { SystemAMapPointEvent } from './system-map-amap-point.controller';

@Injectable()
export class SystemMapAMapController {
  event = {
    map: {
      mousemmove: new EventEmitter<number[]>(),
      completed: new EventEmitter<void>(),
    },
    circle: new SystemAMapCircleEditorEvent(),
    point: new SystemAMapPointEvent(),
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
  private circle = new PromiseValue<SystemAMapCircleEditorController>();

  private regist() {
    this.map.get().then((x) => {
      x.on('complete', () => {
        try {
          let layer = new SystemAMapLayerController(x);
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
        try {
          let circel = new SystemAMapCircleEditorController(x);
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

        this.event.map.completed.emit();
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

  center(position: GisPoint) {
    this.map.get().then((x) => {
      let center = [position.Longitude, position.Latitude];
      x.setCenter(center);
      x.setZoom(18);
    });
  }

  point = {
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

  radius = {
    open: () => {
      this.circle.get().then((x) => {
        x.circle.create();
        x.open();
      });
    },
    close: () => {
      this.circle.get().then((x) => {
        x.circle.remove();
        x.close();
      });
    },
    set: (value: number) => {
      this.circle.get().then((x) => {
        x.set(value);
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
