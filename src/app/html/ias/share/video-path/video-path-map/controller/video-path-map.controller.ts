import { EventEmitter, Injectable } from '@angular/core';
import '../../../../../../../assets/js/map/CoordinateTransform.js';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model.js';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model.js';
import { Time } from '../../../../../../common/data-core/models/common/time.model.js';
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
  constructor(private amap: VideoPathMapAMapController) {
    this.regist.subscribe();
  }

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
    load: async (datas: FileGpsItem[], focus: boolean) => {
      this.data.path = datas;
      let ll = this.data.path.map<[number, number]>((x) => {
        return [x.Longitude, x.Latitude];
      });
      let path = await this.amap.path.get();
      path.load(ll, focus);
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
