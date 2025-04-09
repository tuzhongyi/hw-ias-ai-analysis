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
    this.register.source.change();
    this.register.source.shop();
    this.register.source.road();
    this.register.details();
    this.register.editor.circle();
    this.register.filter();
    this.register.task();
  }

  private register = {
    source: {
      change: () => {
        this.panel.source.change.subscribe((show) => {
          if (show) {
            this.panel.task.show = false;
          }
        });
      },
      shop: () => {
        this.panel.source.shop.select.subscribe((shop) => {
          this.amap.shop.blur();
          this.amap.road.blur();

          if (this.panel.editor.circle.show) {
            if (shop.Location) {
              this.amap.distance.center([
                shop.Location.Longitude,
                shop.Location.Latitude,
              ]);
            }
          }
          this.amap.shop.select(shop);
        });
        this.panel.source.shop.hover.subscribe((shop) => {
          this.amap.shop.hover(shop);
        });
        this.panel.source.shop.out.subscribe((shop) => {
          this.amap.shop.out(shop);
        });
        this.panel.source.shop.position.subscribe((shop) => {
          if (shop.Location) {
            this.amap.map.center(shop.Location);
          }
        });
      },
      road: () => {
        this.panel.source.road.select.subscribe((road) => {
          this.amap.shop.blur();
          this.amap.road.blur();
          if (road) {
            this.amap.road.select(road);
          }
        });
        this.panel.source.road.position.subscribe((road) => {
          this.amap.road.focus(road);
        });
      },
    },
    details: () => {
      this.panel.details.shop.change.subscribe((show) => {
        if (show) {
        } else {
          this.amap.shop.blur();
          this.panel.details.shop.sign.show = false;
          this.panel.details.registration.show = false;
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
            this.panel.details.registration.show = false;
            this.panel.task.show = false;
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
          this.panel.details.registration.show = false;
          this.panel.editor.circle.show = false;
          this.panel.task.show = false;
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
          this.panel.details.registration.show = false;
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
    task: () => {
      this.panel.task.change.subscribe((show) => {
        if (show) {
          this.panel.source.show = false;
          this.panel.details.shop.show = false;
          this.panel.details.registration.show = false;
          this.panel.editor.circle.show = false;
          this.panel.statistic.show = false;
          this.amap.shop.load([]);
          this.amap.map.focus();
          this.panel.state.show = false;
        } else {
          this.panel.statistic.show = true;
          this.panel.state.reset();
          this.panel.state.show = true;
        }
      });
      this.panel.task.return.subscribe(() => {
        this.panel.state.reset();
        this.panel.state.show = false;
        this.amap.shop.load([]);
        this.amap.map.focus();
        this.panel.details.shop.show = false;
        this.panel.details.registration.show = false;
      });
    },
  };
}
