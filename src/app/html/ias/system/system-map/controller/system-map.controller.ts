import { Injectable } from '@angular/core';
import { SystemMapAMapController } from './amap/system-map-amap.controller';
import { SystemMapPanelController } from './panel/system-map-panel.controller';
import { SystemMapWindowController } from './window/system-map-window.controller';

@Injectable()
export class SystemMapController {
  constructor(
    public amap: SystemMapAMapController,
    public panel: SystemMapPanelController,
    public window: SystemMapWindowController
  ) {
    this.regist();
  }

  private regist() {
    this.register.amap.map();
  }

  register = {
    amap: {
      map: () => {
        this.amap.event.map.mousemmove.subscribe((x) => {
          if (!this.panel.position.show) {
            this.panel.position.show = true;
          }
          this.panel.position.point.X = x[0];
          this.panel.position.point.Y = x[1];
        });
      },
    },
  };
}
