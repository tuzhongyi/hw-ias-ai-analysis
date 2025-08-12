import { EventEmitter, Injectable } from '@angular/core';
import '../../../../../../../../assets/js/map/CoordinateTransform.js';
import { FileGpsItem } from '../../../../../../../common/data-core/models/arm/file/file-gps-item.model.js';
import { ShopRegistrationTaskDetectedResult } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration-task-detected-result.model.js';
import { ILocation } from '../../../../../../../common/data-core/models/model.interface.js';
import { AMapInputTipItem } from '../../../../../../../common/helper/map/amap.model.js';
import { ArrayTool } from '../../../../../../../common/tools/array-tool/array.tool.js';
import { ClassTool } from '../../../../../../../common/tools/class-tool/class.tool.js';
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool.js';
import { SystemTaskFileDetailsAMapController } from './system-task-file-details-amap.controller';

@Injectable()
export class SystemTaskFileDetailsMapController {
  event = {
    trigger: new EventEmitter<FileGpsItem>(),
    speed: new EventEmitter<number>(),
    position: new EventEmitter<[number, number]>(),
    point: new EventEmitter<[number, number]>(),
  };

  constructor(private amap: SystemTaskFileDetailsAMapController) {
    this.regist();
  }

  map = {
    center: (position: [number, number]) => {
      this.amap.center(position);
    },
  };
  pickup = {
    can: (enabled: boolean) => {
      this.amap.pickupable = enabled;
    },
    clear: () => {
      this.amap.pickup.get().then((x) => {
        x.remove();
      });
    },
  };
  copied = {
    load: async (datas: [number, number][]) => {
      this.amap.copied.get().then((copied) => {
        let items = datas.map<ILocation>((x) => {
          let gis = {
            WGS84: GeoTool.point.convert.gcj02.to.wgs84(x[0], x[1]),
            GCJ02: x,
            BD09: GeoTool.point.convert.gcj02.to.bd09(x[0], x[1]),
          };
          return gis as ILocation;
        });
        copied.load(items, { zooms: [0, 50] });
      });
    },
  };

  path = {
    datas: [] as FileGpsItem[],
    load: async (datas: FileGpsItem[]) => {
      this.path.datas = datas;
      let ll = this.path.datas.map<[number, number]>((x) => {
        return [x.Longitude, x.Latitude];
      });
      let path = await this.amap.path.get();
      path.load(ll);
    },

    clear: async () => {
      let path = await this.amap.path.get();
      path.clear();
      this.event.point.emit(undefined);
    },
  };

  tips = {
    load: async (datas: AMapInputTipItem[]) => {
      let tips = await this.amap.tip.get();
      tips.load(datas);
    },
    clear: async () => {
      let tips = await this.amap.tip.get();
      tips.clear();
    },
    trigger: {
      over: (data: AMapInputTipItem) => {
        this.amap.tip.get().then((x) => {
          x.mouseover(data);
        });
      },
      out: (data: AMapInputTipItem) => {
        this.amap.tip.get().then((x) => {
          x.mouseout(data);
        });
      },
      select: (data: AMapInputTipItem) => {
        this.amap.tip.get().then((x) => {
          x.select(data);
        });
      },
    },
  };
  detect = {
    load: (datas: ShopRegistrationTaskDetectedResult[]) => {
      this.amap.detect.get().then((x) => {
        x.load(datas);
      });
    },
  };

  private regist() {
    this.amap.path.get().then((path) => {
      path.mouseover.subscribe((point) => {
        this.onmouseover(point);
      });
      path.mouseout.subscribe(() => {
        this.amap.label.get().then((label) => {
          label.hide();
        });
      });
      path.click.subscribe((point) => {
        this.amap.label.get().then((label) => {
          label.hide();
          this.onclick(point);
        });
      });
    });

    this.amap.way.get().then((way) => {
      way.mouseover.subscribe((point) => {
        this.onmouseover(point);
      });
      way.mouseout.subscribe(() => {
        this.amap.label.get().then((label) => {
          label.hide();
        });
      });
      way.click.subscribe((point) => {
        this.amap.label.get().then((label) => {
          label.hide();
          this.onclick(point);
        });
      });
    });
    this.amap.event.point.subscribe((x) => {
      this.event.point.emit(x);
    });
  }

  private async onmouseover(point: [number, number]) {
    let item = this.path.datas.find((x) => {
      return ClassTool.equals.array([x.Longitude, x.Latitude], point);
    });
    if (item) {
      let _point: [number, number] = [item.Longitude, item.Latitude];
      let label = await this.amap.label.get();
      label.show(_point, item.OffsetTime.toString());
    }
  }

  private onclick(point: [number, number]) {
    let item = this.path.datas.find((x) => {
      return ClassTool.equals.array([x.Longitude, x.Latitude], point);
    });
    if (item) {
      this.event.trigger.emit(item);
    }
  }

  async to(stamp: number) {
    return new Promise<FileGpsItem>((resolve) => {
      let times = this.path.datas.map((x) => {
        let time = x.OffsetTime.toDate();
        return time.getTime();
      });

      let finded = ArrayTool.closest(times, stamp);
      if (finded) {
        let item = this.path.datas[finded.index];
        resolve(item);
        this.event.speed.emit(item.Speed);
        this.event.position.emit([item.Longitude, item.Latitude]);

        let way = this.path.datas
          .slice(0, finded.index)
          .map<[number, number]>((x) => {
            return [x.Longitude, x.Latitude];
          });
        this.amap.way.get().then((x) => {
          x.load(way);
        });

        let position: [number, number] = [item.Longitude, item.Latitude];
        this.amap.arrow.get().then((x) => {
          x.set(position);
        });
        if (finded.index > 0) {
          this.amap.arrow.get().then((arrow) => {
            if (Number.isFinite(item.Course)) {
              arrow.direction(item.Course!);
            } else {
              let last = this.path.datas[finded.index - 1];
              arrow.direction1([[last.Longitude, last.Latitude], position]);
            }
          });
        }
      }
    });
  }

  destroy() {
    this.amap.destroy();
  }
}
