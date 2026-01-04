import { Injectable } from '@angular/core';
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';
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
      this.position.point.current.X = x[0];
      this.position.point.current.Y = x[1];

      let saved: [number, number] = [
        this.position.point.saved.X,
        this.position.point.saved.Y,
      ];
      let current: [number, number] = [
        this.position.point.current.X,
        this.position.point.current.Y,
      ];
      if (saved[0] && saved[1]) {
        this.position.distance = GeoTool.math.distance.calculate(
          saved,
          current
        );
      }
    });
    this.amap.event.mouseout.subscribe(() => {
      this.position.show = false;
    });
    this.amap.event.click.subscribe((x) => {
      this.position.point.saved.X = x[0];
      this.position.point.saved.Y = x[1];
    });
  }
}
