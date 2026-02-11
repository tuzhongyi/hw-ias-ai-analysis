import { Injectable } from '@angular/core';
import { MapHelper } from '../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../common/view-models/value.promise';
import { IASMapAMapPathArrowController } from '../../../../map/controller/amap/path/ias-map-amap-path-arrow.controller';
import { IASMapAMapPathLabelController } from '../../../../map/controller/amap/path/ias-map-amap-path-label.controller';
import { IASMapAMapPathWayController } from '../../../../map/controller/amap/path/ias-map-amap-path-way.controller';
import { IASMapAMapPathController } from '../../../../map/controller/amap/path/ias-map-amap-path.controller';
import { VideoPathMapAMapPointController } from './point/video-path-map-amap-point.controller';

@Injectable()
export class VideoPathMapAMapController {
  arrow = new PromiseValue<IASMapAMapPathArrowController>();
  path = new PromiseValue<IASMapAMapPathController>();
  way = new PromiseValue<IASMapAMapPathWayController>();
  label = new PromiseValue<IASMapAMapPathLabelController>();
  point = new PromiseValue<VideoPathMapAMapPointController>();

  constructor() {
    MapHelper.amap.get('video-path-map-container').then((x) => {
      this.map.set(x);
      this.arrow.set(new IASMapAMapPathArrowController(x));
      this.path.set(new IASMapAMapPathController(x));
      this.way.set(new IASMapAMapPathWayController(x));
      this.label.set(new IASMapAMapPathLabelController(x));
      this.point.set(new VideoPathMapAMapPointController(x));
    });
  }

  private map = new PromiseValue<AMap.Map>();

  destroy() {
    this.map.get().then((x) => {
      x.destroy();
      this.map.clear();
    });
  }

  fit = {
    view: (immediately?: boolean) => {
      this.map.get().then((x) => {
        x.setFitView(undefined, immediately);
      });
    },
  };
}
