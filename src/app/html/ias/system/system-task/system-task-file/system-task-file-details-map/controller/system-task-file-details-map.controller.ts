import { EventEmitter, Injectable } from '@angular/core';
import '../../../../../../../../assets/js/map/CoordinateTransform.js';
import { FileGpsItem } from '../../../../../../../common/data-core/models/arm/file/file-gps-item.model.js';
import { ArrayTool } from '../../../../../../../common/tools/array-tool/array.tool.js';
import { ClassTool } from '../../../../../../../common/tools/class-tool/class.tool.js';
import { SystemTaskFileDetailsAMapController } from './system-task-file-details-amap.controller';

@Injectable()
export class SystemTaskFileDetailsMapController {
  event = {
    trigger: new EventEmitter<FileGpsItem>(),
    speed: new EventEmitter<number>(),
    position: new EventEmitter<[number, number]>(),
    point: new EventEmitter<[number, number]>(),
  };

  constructor(private map: SystemTaskFileDetailsAMapController) {
    this.regist();
  }

  private datas: FileGpsItem[] = [];

  async load(datas: FileGpsItem[]) {
    this.datas = datas;
    let ll = this.datas.map<[number, number]>((x) => {
      return [x.Longitude, x.Latitude];
    });
    let path = await this.map.path.get();
    path.load(ll);
  }

  async clear() {
    let path = await this.map.path.get();
    path.clear();
  }

  private regist() {
    this.map.path.get().then((path) => {
      path.mouseover.subscribe((point) => {
        this.onmouseover(point);
      });
      path.mouseout.subscribe(() => {
        this.map.label.get().then((label) => {
          label.hide();
        });
      });
      path.click.subscribe((point) => {
        this.map.label.get().then((label) => {
          label.hide();
          this.onclick(point);
        });
      });
    });

    this.map.way.get().then((way) => {
      way.mouseover.subscribe((point) => {
        this.onmouseover(point);
      });
      way.mouseout.subscribe(() => {
        this.map.label.get().then((label) => {
          label.hide();
        });
      });
      way.click.subscribe((point) => {
        this.map.label.get().then((label) => {
          label.hide();
          this.onclick(point);
        });
      });
    });
    this.map.event.point.subscribe((x) => {
      this.event.point.emit(x);
    });
  }

  private async onmouseover(point: [number, number]) {
    let item = this.datas.find((x) => {
      return ClassTool.equals.array([x.Longitude, x.Latitude], point);
    });
    if (item) {
      let _point: [number, number] = [item.Longitude, item.Latitude];
      let label = await this.map.label.get();
      label.show(_point, item.OffsetTime.toString());
    }
  }

  private onclick(point: [number, number]) {
    let item = this.datas.find((x) => {
      return ClassTool.equals.array([x.Longitude, x.Latitude], point);
    });
    if (item) {
      this.event.trigger.emit(item);
    }
  }

  async to(stamp: number) {
    let times = this.datas.map((x) => {
      let time = x.OffsetTime.toDate();
      return time.getTime();
    });

    let finded = ArrayTool.closest(times, stamp);
    if (finded) {
      let item = this.datas[finded.index];
      this.event.speed.emit(item.Speed);
      this.event.position.emit([item.Longitude, item.Latitude]);

      let way = this.datas.slice(0, finded.index).map<[number, number]>((x) => {
        return [x.Longitude, x.Latitude];
      });
      (await this.map.way.get()).load(way);

      let position: [number, number] = [item.Longitude, item.Latitude];
      (await this.map.arrow.get()).set(position);
      if (finded.index > 0) {
        let arrow = await this.map.arrow.get();
        if (Number.isFinite(item.Course)) {
          arrow.direction(item.Course!);
        } else {
          let last = this.datas[finded.index - 1];
          arrow.direction1([[last.Longitude, last.Latitude], position]);
        }
      }
    }
  }

  destroy() {
    this.map.destroy();
  }
}
