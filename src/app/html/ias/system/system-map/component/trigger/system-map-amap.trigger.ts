import { Injectable } from '@angular/core';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { SystemMapController } from '../controller/system-map.controller';

@Injectable()
export class SystemMapAMapTrigger {
  constructor(private controller: SystemMapController) {
    this.regist();
  }

  private get panel() {
    return this.controller.panel;
  }
  private get amap() {
    return this.controller.amap;
  }

  init() {}

  private regist() {
    this.amap.event.point.click.subscribe((x) => {
      if (x instanceof Shop) {
        this.panel.details.shop.data = x;
        this.panel.details.shop.show = true;
      }
    });
    this.amap.event.map.mousemmove.subscribe((x) => {
      if (!this.panel.position.show) {
        this.panel.position.show = true;
      }
      this.panel.position.point.X = x[0];
      this.panel.position.point.Y = x[1];
    });
  }
}
