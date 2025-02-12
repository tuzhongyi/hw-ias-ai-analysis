import { Injectable } from '@angular/core';
import { MapHelper } from '../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../common/view-models/value.promise';
import { SystemTaskFileDetailsAMapArrowController } from './system-task-file-details-amap-arrow.controller';
import { SystemTaskFileDetailsAMapLabelController } from './system-task-file-details-amap-label.controller';
import { SystemTaskFileDetailsAMapPathWayController } from './system-task-file-details-amap-path-way.controller';
import { SystemTaskFileDetailsAMapPathController } from './system-task-file-details-amap-path.controller';

@Injectable()
export class SystemTaskFileDetailsAMapController {
  arrow = new PromiseValue<SystemTaskFileDetailsAMapArrowController>();
  path = new PromiseValue<SystemTaskFileDetailsAMapPathController>();
  way = new PromiseValue<SystemTaskFileDetailsAMapPathWayController>();
  label = new PromiseValue<SystemTaskFileDetailsAMapLabelController>();

  constructor() {
    MapHelper.amap.get('map-container').then((x) => {
      this.map.set(x);
      this.arrow.set(new SystemTaskFileDetailsAMapArrowController(x));
      this.path.set(new SystemTaskFileDetailsAMapPathController(x));
      this.way.set(new SystemTaskFileDetailsAMapPathWayController(x));
      this.label.set(new SystemTaskFileDetailsAMapLabelController(x));
    });
  }

  private map = new PromiseValue<AMap.Map>();

  destroy() {
    this.map.get().then((x) => {
      x.destroy();
    });
  }
}
