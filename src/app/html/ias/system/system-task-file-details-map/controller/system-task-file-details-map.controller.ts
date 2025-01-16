import { EventEmitter, Injectable } from '@angular/core';
import '../../../../../../assets/js/map/CoordinateTransform.js';
import { FileGpsItem } from '../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { ArrayTool } from '../../../../../common/tools/array-tool/array.tool';
import { ClassTool } from '../../../../../common/tools/class-tool/class.tool.js';
import { SystemTaskFileDetailsAMapController } from './system-task-file-details-amap.controller';

@Injectable()
export class SystemTaskFileDetailsMapController {
  trigger = new EventEmitter<FileGpsItem>();
  speed = new EventEmitter<number>();
  constructor(private map: SystemTaskFileDetailsAMapController) {
    this.regist();
  }

  private datas: FileGpsItem[] = [];

  async load(datas: FileGpsItem[]) {
    this.datas = datas;
    let ll = this.datas.map((x) => {
      return [x.Longitude, x.Latitude];
    });
    let path = await this.map.path;
    path.load(ll);
  }

  private regist() {
    this.map.path.then((path) => {
      path.mouseover.subscribe((point) => {
        this.onmouseover(point);
      });
      path.mouseout.subscribe(() => {
        this.map.label.then((label) => {
          label.hide();
        });
      });
      path.click.subscribe((point) => {
        this.map.label.then((label) => {
          label.hide();
          this.onclick(point);
        });
      });
    });

    this.map.way.then((way) => {
      way.mouseover.subscribe((point) => {
        this.onmouseover(point);
      });
      way.mouseout.subscribe(() => {
        this.map.label.then((label) => {
          label.hide();
        });
      });
      way.click.subscribe((point) => {
        this.map.label.then((label) => {
          label.hide();
          this.onclick(point);
        });
      });
    });
  }

  private async onmouseover(point: number[]) {
    let item = this.datas.find((x) => {
      return ClassTool.equals.array([x.Longitude, x.Latitude], point);
    });
    if (item) {
      console.log('item', item);
      let point = [item.Longitude, item.Latitude];
      let label = await this.map.label;
      label.show(point, item.OffsetTime.toString());
    }
  }

  private onclick(point: number[]) {
    let item = this.datas.find((x) => {
      return ClassTool.equals.array([x.Longitude, x.Latitude], point);
    });
    if (item) {
      this.trigger.emit(item);
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
      this.speed.emit(item.Speed);

      let way = this.datas.slice(0, finded.index).map((x) => {
        return [x.Longitude, x.Latitude];
      });
      (await this.map.way).load(way);

      let position = [item.Longitude, item.Latitude];
      (await this.map.arrow).set(position);
      if (finded.index > 0) {
        let arrow = await this.map.arrow;
        if (Number.isFinite(item.Course)) {
          arrow.direction(item.Course!);
        } else {
          let last = this.datas[finded.index - 1];
          arrow.direction1([[last.Longitude, last.Latitude], position]);
        }
      }
    }
  }
}
