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
    this.register.source();
    this.register.details();
    this.register.editor.circle();
    this.register.filter();
  }

  private register = {
    source: () => {
      this.panel.source.select.subscribe((shop) => {
        if (this.panel.editor.circle.show) {
          if (shop.Location) {
            this.amap.distance.center([
              shop.Location.Longitude,
              shop.Location.Latitude,
            ]);
          }
        }
        this.amap.point.select(shop);
      });
      this.panel.source.hover.subscribe((shop) => {
        this.amap.point.hover(shop);
      });
      this.panel.source.out.subscribe((shop) => {
        this.amap.point.out(shop);
      });
      this.panel.source.position.subscribe((shop) => {
        if (shop.Location) {
          this.amap.center(shop.Location);
        }
      });
    },
    details: () => {
      this.panel.details.shop.change.subscribe((show) => {
        if (!show) {
          this.amap.point.blur();
        }
      });
    },
    editor: {
      circle: () => {
        this.panel.editor.circle.change.subscribe((show) => {
          if (show) {
            this.amap.distance.open();
          } else {
            this.amap.distance.close();
          }
          if (show) {
            this.panel.source.show = false;
            this.panel.details.shop.show = false;
          }
        });
        this.panel.editor.circle.distance.subscribe((value) => {
          this.amap.distance.radius(value);
        });
      },
    },
    filter: () => {
      this.panel.filter.change.subscribe((show) => {
        if (show) {
          this.panel.source.show = false;
          this.panel.details.shop.show = false;
          this.panel.editor.circle.show = false;
        } else {
          if (this.amap.distance.opened) {
            this.panel.editor.circle.show = true;
          }
        }
      });
      this.panel.filter.getting.change.subscribe((show) => {
        if (show) {
          this.panel.search.show = false;
          this.panel.controls.show = false;
          this.panel.state.show = false;
          this.panel.statistic.show = false;
          this.panel.source.show = false;
          this.panel.details.shop.show = false;
        } else {
          this.panel.search.show = true;
          this.panel.controls.show = true;
          this.panel.state.show = true;
          this.panel.statistic.show = true;
          this.panel.filter.show = true;
        }

        if (show) {
          this.amap.distance.open();
        }
      });
      this.panel.filter.getting.distance.subscribe((value) => {
        this.amap.distance.radius(value);
      });
    },
  };
}
