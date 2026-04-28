import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import '../../../../../../../assets/js/map/CoordinateTransform.js';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model.js';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model.js';
import { Time } from '../../../../../../common/data-core/models/common/time.model.js';
import { ArrayTool } from '../../../../../../common/tools/array-tool/array.tool.js';
import { ClassTool } from '../../../../../../common/tools/class-tool/class.tool.js';
import {
  GeoLine,
  GeoPoint,
} from '../../../../../../common/tools/geo-tool/geo.model.js';
import { IASMapAMapPathHelper } from '../../../map/controller/amap/path/ias-map-amap-path.helper.js';
import { IIASMapArgs } from '../../../map/ias-map.model.js';
import { IVideoPathMapTriggerArgs } from '../video-path-map.model.js';
import { VideoPathMapAMapController } from './amap/video-path-map-amap.controller.js';

@Injectable()
export class VideoPathMapController {
  trigger = new EventEmitter<IVideoPathMapTriggerArgs>();
  speed = new EventEmitter<number>();
  constructor(private subscription: Subscription) {
    this.amap = new VideoPathMapAMapController(subscription);
    this.regist.subscribe();
  }
  private amap: VideoPathMapAMapController;

  private data = {
    path: [] as FileGpsItem[],
    point: [] as GisPoint[],
  };

  point = {
    load: async (datas: GisPoint[], args: IIASMapArgs) => {
      let ctr = await this.amap.point.get();
      return ctr.load(datas, args);
    },
    clear: async () => {
      let point = await this.amap.point.get();
      await point.clear();
      this.data.point = [];
    },
  };

  path = {
    load: async (datas: FileGpsItem[][], focus: boolean) => {
      this.data.path = ArrayTool.unique(datas.flat(1), (a, b) => {
        if (a.OSDTime && b.OSDTime) {
          return a.OSDTime.getTime() == b.OSDTime.getTime();
        }
        if (a.OffsetMilliseconds && b.OffsetMilliseconds) {
          return a.OffsetMilliseconds == b.OffsetMilliseconds;
        }
        if (a.OffsetTime && b.OffsetTime) {
          return (
            a.OffsetTime.toDate().getTime() == b.OffsetTime.toDate().getTime()
          );
        }
        return a.Longitude == b.Longitude && a.Latitude == b.Latitude;
      });

      this.amap.path.load(datas, focus);
    },
    clear: async () => {
      this.data.path = [];
      this.amap.path.clear();
    },
  };

  private regist = {
    subscribe: () => {
      let sub_mouseover = this.amap.path.mouseover.subscribe((point) => {
        this.regist.on.mouseover(point);
      });
      this.subscription.add(sub_mouseover);

      let sub_mouseout = this.amap.path.mouseout.subscribe(() => {
        this.amap.label.get().then((label) => {
          label.hide();
        });
      });
      this.subscription.add(sub_mouseout);

      let sub_click = this.amap.path.click.subscribe((point) => {
        this.amap.label.get().then((label) => {
          label.hide();
          this.regist.on.click(point);
        });
      });
      this.subscription.add(sub_click);

      // this.amap.path.get().then((path) => {
      //    path.mouseover.subscribe((point) => {
      //     this.regist.on.mouseover(point);
      //   });
      //   path.mouseout.subscribe(() => {
      //     this.amap.label.get().then((label) => {
      //       label.hide();
      //     });
      //   });
      //   path.click.subscribe((point) => {
      //     this.amap.label.get().then((label) => {
      //       label.hide();
      //       this.regist.on.click(point);
      //     });
      //   });
      // });

      this.amap.way.get().then((way) => {
        let sub_mouseover = way.mouseover.subscribe((point) => {
          this.regist.on.mouseover(point);
        });
        this.subscription.add(sub_mouseover);

        let sub_mouseout = way.mouseout.subscribe(() => {
          this.amap.label.get().then((label) => {
            label.hide();
          });
        });
        this.subscription.add(sub_mouseout);

        let sub_click = way.click.subscribe((point) => {
          this.amap.label.get().then((label) => {
            label.hide();
            this.regist.on.click(point);
          });
        });
        this.subscription.add(sub_click);
      });
    },
    on: {
      mouseover: async (data: {
        line: GeoLine;
        point: GeoPoint;
        percent: number;
      }) => {
        let line = {
          start: this.data.path.find((x) => {
            return ClassTool.equals.array(
              [x.Longitude, x.Latitude],
              data.line[0]
            );
          }),
          end: this.data.path.find((x) => {
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

      click: (data: { line: GeoLine; point: GeoPoint; percent: number }) => {
        let line = {
          start: this.data.path.find((x) => {
            return ClassTool.equals.array(
              [x.Longitude, x.Latitude],
              data.line[0]
            );
          }),
          end: this.data.path.find((x) => {
            return ClassTool.equals.array(
              [x.Longitude, x.Latitude],
              data.line[1]
            );
          }),
        };

        if (line.start && line.end) {
          this.trigger.emit({
            start: line.start,
            end: line.end,
            percent: data.percent,
          });
        }
      },
    },
  };

  async to(stamp: number) {
    return new Promise<FileGpsItem>((resolve) => {
      IASMapAMapPathHelper.to(
        this.data.path,
        stamp,
        {
          way: this.amap.way.get(),
          arrow: this.amap.arrow.get(),
        },
        {
          closest: async (current) => {
            resolve(current);
          },
        }
      );
    });
  }

  fit = {
    view: () => {
      setTimeout(() => {
        this.amap.fit.view(true);
      }, 2 * 1000);
    },
  };

  destroy() {
    this.amap.destroy();
  }
}
