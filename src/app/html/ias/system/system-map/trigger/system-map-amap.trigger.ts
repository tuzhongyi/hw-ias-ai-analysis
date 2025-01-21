import { Injectable } from '@angular/core';
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
      this.panel.details.shop.data = x;
      this.panel.details.shop.show = true;
    });
  }
}
