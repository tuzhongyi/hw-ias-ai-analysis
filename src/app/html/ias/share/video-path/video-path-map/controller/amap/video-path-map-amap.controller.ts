import { Injectable } from '@angular/core';
import { MapHelper } from '../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../common/view-models/value.promise';
import { VideoPathMapAMapPointController } from './point/video-path-map-amap-point.controller';
import { VideoPathMapAMapArrowController } from './video-path-map-amap-arrow.controller';
import { VideoPathMapAMapLabelController } from './video-path-map-amap-label.controller';
import { VideoPathMapAMapPathWayController } from './video-path-map-amap-path-way.controller';
import { VideoPathMapAMapPathController } from './video-path-map-amap-path.controller';

@Injectable()
export class VideoPathMapAMapController {
  arrow = new PromiseValue<VideoPathMapAMapArrowController>();
  path = new PromiseValue<VideoPathMapAMapPathController>();
  way = new PromiseValue<VideoPathMapAMapPathWayController>();
  label = new PromiseValue<VideoPathMapAMapLabelController>();
  point = new PromiseValue<VideoPathMapAMapPointController>();

  constructor() {
    MapHelper.amap.get('video-path-map-container').then((x) => {
      this.map.set(x);
      this.arrow.set(new VideoPathMapAMapArrowController(x));
      this.path.set(new VideoPathMapAMapPathController(x));
      this.way.set(new VideoPathMapAMapPathWayController(x));
      this.label.set(new VideoPathMapAMapLabelController(x));
      this.point.set(new VideoPathMapAMapPointController(x));
    });
  }

  private map = new PromiseValue<AMap.Map>();

  destroy() {
    this.map.get().then((x) => {
      x.destroy();
    });
  }
}
