import { EventEmitter, Injectable } from '@angular/core';
import { MapHelper } from '../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../common/view-models/value.promise';
import { SystemTaskFileDetailsAMapPointController } from './point/system-task-file-details-amap-point.controller';
import { SystemTaskFileDetailsAMapArrowController } from './system-task-file-details-amap-arrow.controller';
import { SystemTaskFileDetailsAMapLabelController } from './system-task-file-details-amap-label.controller';
import { SystemTaskFileDetailsAMapPathWayController } from './system-task-file-details-amap-path-way.controller';
import { SystemTaskFileDetailsAMapPathController } from './system-task-file-details-amap-path.controller';

@Injectable()
export class SystemTaskFileDetailsAMapController {
  event = {
    point: new EventEmitter<[number, number]>(),
  };

  arrow = new PromiseValue<SystemTaskFileDetailsAMapArrowController>();
  path = new PromiseValue<SystemTaskFileDetailsAMapPathController>();
  way = new PromiseValue<SystemTaskFileDetailsAMapPathWayController>();
  label = new PromiseValue<SystemTaskFileDetailsAMapLabelController>();
  point = new PromiseValue<SystemTaskFileDetailsAMapPointController>();

  constructor() {
    MapHelper.amap.get('system-task-file-details-map-container').then((x) => {
      this.map.set(x);
      this.regist.map(x);

      this.arrow.set(new SystemTaskFileDetailsAMapArrowController(x));
      this.path.set(new SystemTaskFileDetailsAMapPathController(x));
      this.way.set(new SystemTaskFileDetailsAMapPathWayController(x));
      this.label.set(new SystemTaskFileDetailsAMapLabelController(x));

      let point = new SystemTaskFileDetailsAMapPointController(x);
      this.point.set(point);
      this.regist.point(point);
    });
  }

  private map = new PromiseValue<AMap.Map>();

  private regist = {
    map: (map: AMap.Map) => {
      map.on('click', (x) => {
        this.point.get().then((point) => {
          let position: [number, number] = [x.lnglat.lng, x.lnglat.lat];
          point.remove().then((x) => {
            point.create(position);
            this.event.point.emit(position);
          });
        });
      });
    },
    point: (controller: SystemTaskFileDetailsAMapPointController) => {
      controller.event.dragend.subscribe((x) => {
        this.event.point.emit(x);
      });
    },
  };

  destroy() {
    this.map.get().then((x) => {
      x.destroy();
      this.map.clear();
    });
  }
}
