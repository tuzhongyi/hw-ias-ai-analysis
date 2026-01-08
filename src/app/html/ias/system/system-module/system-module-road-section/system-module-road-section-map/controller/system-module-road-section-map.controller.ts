import { Injectable } from '@angular/core';
import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';
import { SystemModuleRoadSectionMapAMapController } from './amap/system-module-road-section-map-amap.controller';
import { SystemModuleRoadSectionMapPositionController } from './system-module-road-section-map-position.controller';

@Injectable()
export class SystemModuleRoadSectionMapController {
  constructor(
    public amap: SystemModuleRoadSectionMapAMapController,
    public position: SystemModuleRoadSectionMapPositionController
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

  road = {
    load: (datas: Road[]) => {
      return this.amap.road.get().then((x) => {
        return x.load(datas);
      });
    },
    destory: () => {
      this.amap.road.get().then((x) => {
        x.clear();
        this.amap.road.clear();
      });
    },
  };

  map = {
    focus: (datas?: any) => {
      this.amap.focus(datas);
    },
    destroy: () => {
      this.road.destory();
      this.amap.destroy();
    },
  };
}
