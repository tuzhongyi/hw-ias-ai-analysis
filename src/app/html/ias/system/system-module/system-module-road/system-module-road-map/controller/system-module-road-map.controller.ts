import { Injectable } from '@angular/core';
import { SystemModuleRoadMapAMapController } from './amap/system-module-road-map-amap.controller';
import { SystemModuleRoadMapPositionController } from './system-module-road-map-position.controller';

@Injectable()
export class SystemModuleRoadMapController {
  constructor(
    public amap: SystemModuleRoadMapAMapController,
    public position: SystemModuleRoadMapPositionController
  ) {
    this.regist();
  }

  private regist() {
    this.amap.event.mousemove.subscribe((x) => {
      this.position.show = true;
      this.position.point.X = x[0];
      this.position.point.Y = x[1];
    });
    this.amap.event.mouseout.subscribe(() => {
      this.position.show = false;
    });
  }
}
