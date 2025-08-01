import { EventEmitter, Injectable } from '@angular/core';
import '../../../../../../../assets/js/map/CoordinateTransform.js';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model.js';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model.js';
import { ArrayTool } from '../../../../../../common/tools/array-tool/array.tool.js';
import { ClassTool } from '../../../../../../common/tools/class-tool/class.tool.js';
import { IIASMapArgs } from '../../../map/ias-map.model.js';
import { VideoPathMapAMapController } from './amap/video-path-map-amap.controller.js';

@Injectable()
export class VideoPathMapController {
  trigger = new EventEmitter<FileGpsItem>();
  speed = new EventEmitter<number>();
  constructor(private amap: VideoPathMapAMapController) {
    this.regist.subscribe();
  }

  private data = {
    path: [] as FileGpsItem[],
    point: [] as GisPoint[],
  };

  point = {
    load: (datas: GisPoint[], args: IIASMapArgs) => {
      this.amap.point.get().then((x) => {
        x.load(datas, args);
      });
    },
    clear: async () => {
      let point = await this.amap.point.get();
      await point.clear();
      this.data.point = [];
    },
  };

  path = {
    load: async (datas: FileGpsItem[]) => {
      this.data.path = datas;
      let ll = this.data.path.map<[number, number]>((x) => {
        return [x.Longitude, x.Latitude];
      });
      let path = await this.amap.path.get();
      path.load(ll);
    },
    clear: async () => {
      this.data.path = [];
      let path = await this.amap.path.get();
      path.clear();
    },
  };

  private regist = {
    subscribe: () => {
      this.amap.path.get().then((path) => {
        path.mouseover.subscribe((point) => {
          this.regist.on.mouseover(point);
        });
        path.mouseout.subscribe(() => {
          this.amap.label.get().then((label) => {
            label.hide();
          });
        });
        path.click.subscribe((point) => {
          this.amap.label.get().then((label) => {
            label.hide();
            this.regist.on.click(point);
          });
        });
      });

      this.amap.way.get().then((way) => {
        way.mouseover.subscribe((point) => {
          this.regist.on.mouseover(point);
        });
        way.mouseout.subscribe(() => {
          this.amap.label.get().then((label) => {
            label.hide();
          });
        });
        way.click.subscribe((point) => {
          this.amap.label.get().then((label) => {
            label.hide();
            this.regist.on.click(point);
          });
        });
      });
    },
    on: {
      mouseover: async (point: [number, number]) => {
        let item = this.data.path.find((x) => {
          return ClassTool.equals.array([x.Longitude, x.Latitude], point);
        });
        if (item) {
          let _point: [number, number] = [item.Longitude, item.Latitude];
          let label = await this.amap.label.get();
          label.show(_point, item.OffsetTime.toString());
        }
      },

      click: async (point: [number, number]) => {
        let item = this.data.path.find((x) => {
          return ClassTool.equals.array([x.Longitude, x.Latitude], point);
        });
        if (item) {
          this.trigger.emit(item);
        }
      },
    },
  };

  async to(stamp: number) {
    return new Promise<FileGpsItem>((resolve) => {
      let times = this.data.path.map((x) => {
        let time = x.OffsetTime.toDate();
        return time.getTime();
      });

      let finded = ArrayTool.closest(times, stamp);
      if (finded) {
        let item = this.data.path[finded.index];
        resolve(item);
        this.speed.emit(item.Speed);

        let way = this.data.path
          .slice(0, finded.index)
          .map<[number, number]>((x) => {
            return [x.Longitude, x.Latitude];
          });
        this.amap.way.get().then((x) => {
          x.load(way);
        });
        let position: [number, number] = [item.Longitude, item.Latitude];

        this.amap.arrow.get().then((arrow) => {
          arrow.set(position);
          if (finded.index > 0) {
            if (Number.isFinite(item.Course)) {
              arrow.direction(item.Course!);
            } else {
              let last = this.data.path[finded.index - 1];
              arrow.direction1([[last.Longitude, last.Latitude], position]);
            }
          }
        });
      }
    });
  }

  destroy() {
    this.amap.destroy();
  }
}
