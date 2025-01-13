import { Injectable } from '@angular/core';
import { PromiseValue } from '../../../../../../common/models/value.promise';
import { SystemMapPanel } from '../../system-map.panel';
import { SystemAMapController } from '../amap/system-map-amap.controller';

@Injectable()
export class SystemMapPanelController {
  constructor(private amap: SystemAMapController) {}

  private panel = new PromiseValue<SystemMapPanel>();

  init(panel: SystemMapPanel) {
    this.panel.set(panel);
    panel.state.show = true;
    this.regist(panel);
  }

  private regist(panel: SystemMapPanel) {
    panel.editor.circle.change.subscribe((show) => {
      this.panel.get().then((panel) => {
        panel.state.show = !show;
        panel.source.show = false;

        if (show) {
          this.amap.radius.open();
        } else {
          this.amap.radius.close();
        }
      });
    });
    panel.source.change.subscribe((show) => {
      this.panel.get().then((panel) => {
        panel.state.show = true;
        panel.editor.circle.show = false;
      });
    });
  }
}
