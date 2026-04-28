import { EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs';
import { FileGpsItem } from '../../../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { Time } from '../../../../../../../../../common/data-core/models/common/time.model';
import { ClassTool } from '../../../../../../../../../common/tools/class-tool/class.tool';
import {
  GeoLine,
  GeoPoint,
} from '../../../../../../../../../common/tools/geo-tool/geo.model';
import { IASMapAMapPathHelper } from '../../../../../../../share/map/controller/amap/path/ias-map-amap-path.helper';
import { IIASMapCurrent } from '../../../../../../../share/map/ias-map.model';
import { FileGpsItemPercent } from '../../system-module-road-object-video-map.model';
import { SystemModuleRoadObjectVideoAMapController } from './system-module-road-object-video-amap.controller';
import { SystemMainMapRoadObjectLineController } from './system-module-road-object-video-object-line.controller';
import { SystemMainMapRoadObjectPointController } from './system-module-road-object-video-object-point.controller';

export class SystemModuleRoadObjectVideoMapController {
  event = {
    trigger: new EventEmitter<FileGpsItemPercent>(),
    position: new EventEmitter<[number, number]>(),
    point: new EventEmitter<[number, number]>(),
    course: new EventEmitter<number>(),
    current: new EventEmitter<IIASMapCurrent>(),
  };
  object: {
    point: SystemMainMapRoadObjectPointController;
    line: SystemMainMapRoadObjectLineController;
  };
  private amap: SystemModuleRoadObjectVideoAMapController;
  constructor(subscription: Subscription) {
    this.amap = new SystemModuleRoadObjectVideoAMapController(subscription);
    this.object = {
      point: new SystemMainMapRoadObjectPointController(
        this.amap,
        subscription
      ),
      line: new SystemMainMapRoadObjectLineController(this.amap, subscription),
    };
    this.regist(subscription);
  }

  map = {
    center: (position: [number, number]) => {
      this.amap.center(position);
    },
  };
  pickup = {
    point: {
      can: (enabled: boolean) => {
        this.amap.pickupable = enabled;
      },
      clear: () => {
        this.amap.pickup.point.get().then((x) => {
          x.remove();
        });
      },
    },
    line: {
      create: async (datas: [number, number][]) => {
        let line = await this.amap.pickup.line.get();
        line.creation.clear();
        line.creation.load(datas);
      },
      clear: () => {},
    },
  };
  arrow = {
    center: async (position: [number, number]) => {
      let ctr = await this.amap.arrow.get();
      ctr.center(position);
    },
  };
  path = {
    datas: [] as FileGpsItem[],
    load: async (datas: FileGpsItem[], focus: boolean) => {
      this.path.datas = datas;
      this.amap.path.load(datas, focus);
    },
    clear: async () => {
      this.path.datas = [];
      this.amap.path.clear();
      this.event.point.emit(undefined);
    },
    show: () => {
      this.amap.path.load(this.path.datas, false);
    },
    hide: () => {
      this.amap.path.clear();
    },
  };

  private regist(subscription: Subscription) {
    let sub_mouseover = this.amap.path.mouseover.subscribe((data) => {
      this.on.label.show(data);
    });
    subscription.add(sub_mouseover);
    let sub_mouseout = this.amap.path.mouseout.subscribe(() => {
      this.amap.label.get().then((label) => {
        label.hide();
      });
    });
    subscription.add(sub_mouseout);
    let sub_click = this.amap.path.click.subscribe((data) => {
      this.amap.label.get().then((label) => {
        label.hide();
        this.onclick(data);
      });
    });
    subscription.add(sub_click);

    this.amap.way.get().then((way) => {
      let sub_way_mouseover = way.mouseover.subscribe((point) => {
        this.on.label.show(point);
      });
      subscription.add(sub_way_mouseover);
      let sub_way_mouseout = way.mouseout.subscribe(() => {
        this.on.label.hide();
      });
      subscription.add(sub_way_mouseout);
      let sub_way_click = way.click.subscribe((point) => {
        this.amap.label.get().then((label) => {
          label.hide();
          this.onclick(point);
        });
      });
      subscription.add(sub_way_click);
    });
    let sub_point = this.amap.event.point.subscribe((x) => {
      this.event.point.emit(x);
    });
    subscription.add(sub_point);
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

  private async onclick(data: {
    line: GeoLine;
    point: GeoPoint;
    percent: number;
  }) {
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

  async to(stamp: number, displayroute = true) {
    return new Promise<FileGpsItem>((resolve) => {
      IASMapAMapPathHelper.to(
        this.path.datas,
        stamp,
        {
          way: this.amap.way.get(),
          arrow: this.amap.arrow.get(),
        },
        {
          course: async (course) => {
            this.event.course.emit(course);
          },
          closest: async (current) => {
            resolve(current);
          },
          current: async (current) => {
            this.event.current.emit(current);
          },
        },
        displayroute
      );
    });
  }

  async destroy() {
    await this.object.point.clear();
    await this.object.line.clear();
    await this.path.clear();
    this.amap.destroy();
  }
}
