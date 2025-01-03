import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import '../../../../../assets/js/map/CoordinateTransform.js';
import { FileGpsItem } from '../../../../common/data-core/models/arm/file/file-gps-item.model';
import { FileInfo } from '../../../../common/data-core/models/arm/file/file-info.model.js';
import { ArrayTool } from '../../../../common/tools/array-tool/array.tool';
import { SystemTaskFileDetailsAMapController } from './controller/system-task-file-details-amap.controller';
import { SystemTaskFileDetailsMapBusiness } from './system-task-file-details-map.business.js';
declare var wgs84togcj02: any;
@Component({
  selector: 'ias-system-task-file-details-map',
  imports: [CommonModule],
  templateUrl: './system-task-file-details-map.component.html',
  styleUrl: './system-task-file-details-map.component.less',
  providers: [
    SystemTaskFileDetailsAMapController,
    SystemTaskFileDetailsMapBusiness,
  ],
})
export class SystemTaskFileDetailsMapComponent implements OnInit {
  @Input() data?: FileInfo;
  @Input('to') _to?: EventEmitter<number>;
  @Output() trigger = new EventEmitter<FileGpsItem>();

  constructor(
    private business: SystemTaskFileDetailsMapBusiness,
    private map: SystemTaskFileDetailsAMapController
  ) {}

  loading = false;
  private datas: FileGpsItem[] = [];

  ngOnInit(): void {
    if (this._to) {
      this._to.subscribe((x) => {
        this.to(x);
      });
    }
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

    if (this.data) {
      this.loading = true;
      this.business.load(this.data.FileName).then((x) => {
        this.load(x).finally(() => {
          this.loading = false;
        });
      });
    }
  }

  async onmouseover(point: number[]) {
    let item = this.datas.find((x) => {
      let gcj02 = wgs84togcj02(x.Longitude, x.Latitude);

      return gcj02[0] === point[0] && gcj02[1] === point[1];
    });
    if (item) {
      console.log('item', item);
      let point = wgs84togcj02(item.Longitude, item.Latitude);
      let label = await this.map.label;
      label.show(point, item.OffsetTime.toString());
    }
  }

  onclick(point: number[]) {
    let item = this.datas.find((x) => {
      let gcj02 = wgs84togcj02(x.Longitude, x.Latitude);

      return gcj02[0] === point[0] && gcj02[1] === point[1];
    });
    if (item) {
      this.trigger.emit(item);
    }
  }

  async load(datas: FileGpsItem[]) {
    this.datas = datas;
    let ll = this.datas.map((x) => {
      return wgs84togcj02(x.Longitude, x.Latitude);
    });
    let path = await this.map.path;
    path.load(ll);
  }

  async to(stamp: number) {
    let times = this.datas.map((x) => {
      let time = x.OffsetTime.toDate();
      return time.getTime();
    });

    let finded = ArrayTool.closest(times, stamp);
    if (finded) {
      let item = this.datas[finded.index];

      let way = this.datas.slice(0, finded.index).map((x) => {
        return wgs84togcj02(x.Longitude, x.Latitude);
      });
      (await this.map.way).load(way);

      let position = wgs84togcj02(item.Longitude, item.Latitude);
      (await this.map.arrow).set(position);
      if (finded.index > 0) {
        let last = this.datas[finded.index - 1];
        (await this.map.arrow).direction([
          wgs84togcj02(last.Longitude, last.Latitude),
          position,
        ]);
      }
    }
  }
}
