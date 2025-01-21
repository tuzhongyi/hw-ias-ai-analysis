import { Injectable } from '@angular/core';
import { SystemMapController } from '../controller/system-map.controller';

@Injectable()
export class SystemMapPanelTrigger {
  constructor(private controller: SystemMapController) {
    this.regist();
  }

  private get panel() {
    return this.controller.panel;
  }
  private get amap() {
    return this.controller.amap;
  }

  private regist() {
    this.panel.editor.circle.change.subscribe((show) => {
      if (show) {
        this.amap.radius.open();
      } else {
        this.amap.radius.close();
      }
    });
    this.panel.details.shop.change.subscribe((show) => {
      if (!show) {
        this.amap.point.blur();
      }
    });
  }
}
