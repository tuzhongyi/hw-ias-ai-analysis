import { EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs';
import { FileGpsItem } from '../../../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { Time } from '../../../../../../../../../common/data-core/models/common/time.model';
import { ArrayTool } from '../../../../../../../../../common/tools/array-tool/array.tool';
import { ClassTool } from '../../../../../../../../../common/tools/class-tool/class.tool';
import {
  GeoLine,
  GeoPoint,
} from '../../../../../../../../../common/tools/geo-tool/geo.model';
import { SystemModuleRoadObjectVideoAMapController } from './system-module-road-object-video-amap.controller';
import { SystemMainMapRoadObjectController } from './system-module-road-object-video-objects.controller';

export class SystemModuleRoadObjectVideoMapController {
  event = {
    trigger: new EventEmitter<{
      start: FileGpsItem;
      end: FileGpsItem;
      percent: number;
    }>(),
    position: new EventEmitter<[number, number]>(),
    point: new EventEmitter<[number, number]>(),
  };
  object: SystemMainMapRoadObjectController;
  private amap: SystemModuleRoadObjectVideoAMapController;
  constructor(subscription: Subscription) {
    this.amap = new SystemModuleRoadObjectVideoAMapController(subscription);
    this.object = new SystemMainMapRoadObjectController(
      this.amap,
      subscription
    );
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
  path = {
    datas: [] as FileGpsItem[],
    load: async (datas: FileGpsItem[], focus: boolean) => {
      this.path.datas = datas;
      let ll = this.path.datas.map<[number, number]>((x) => {
        return [x.Longitude, x.Latitude];
      });
      let path = await this.amap.path.get();
      path.load(ll, focus);
    },

    clear: async () => {
      let path = await this.amap.path.get();
      path.clear();
      this.event.point.emit(undefined);
    },
  };

  private regist() {
    this.amap.path.get().then((path) => {
      path.mouseover.subscribe((data) => {
        this.on.label.show(data);
      });
      path.mouseout.subscribe(() => {
        this.amap.label.get().then((label) => {
          label.hide();
        });
      });
      path.click.subscribe((data) => {
        this.amap.label.get().then((label) => {
          label.hide();
          this.onclick(data);
        });
      });
    });

    this.amap.way.get().then((way) => {
      way.mouseover.subscribe((point) => {
        this.on.label.show(point);
      });
      way.mouseout.subscribe(() => {
        this.on.label.hide();
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

  on = {
    label: {
      show: async (data: {
        line: GeoLine;
        point: GeoPoint;
        percent: number;
      }) => {
        let line = {
          start: this.path.datas.find((x) => {
            return ClassTool.equals.array(
              [x.Longitude, x.Latitude],
              data.line[0]
            );
          }),
          end: this.path.datas.find((x) => {
            return ClassTool.equals.array(
              [x.Longitude, x.Latitude],
              data.line[1]
            );
          }),
        };

        if (line.start && line.end) {
          let start = line.start.OffsetTime.toSeconds();
          let end = line.end.OffsetTime.toSeconds();

          let timestamp = start + (end - start) * data.percent;
          let label = await this.amap.label.get();
          let time = Time.from.seconds(timestamp);
          label.show(data.point, `${time.toString()}`);
        }
      },
      hide: () => {
        this.amap.label.get().then((label) => {
          label.hide();
        });
      },
    },
  };

  private onclick(data: { line: GeoLine; point: GeoPoint; percent: number }) {
    let line = {
      start: this.path.datas.find((x) => {
        return ClassTool.equals.array([x.Longitude, x.Latitude], data.line[0]);
      }),
      end: this.path.datas.find((x) => {
        return ClassTool.equals.array([x.Longitude, x.Latitude], data.line[1]);
      }),
    };

    if (line.start && line.end) {
      this.event.trigger.emit({
        start: line.start,
        end: line.end,
        percent: data.percent,
      });
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
