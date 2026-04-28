import { GisPoint } from '../../../../../../../../common/data-core/models/arm/gis-point.model';
import { GeoTool } from '../../../../../../../../common/tools/geo-tool/geo.tool';
import { SystemModuleRoadObjectDetailsAMapLineController } from './amap/system-module-road-object-details-amap-line.controller';
import { SystemModuleRoadObjectDetailsMapLinePositionController } from './system-module-road-object-details-map-position.controller';

export class SystemModuleRoadObjectDetailsMapLineController {
  get creator() {
    return this.amap.creator;
  }
  get editor() {
    return this.amap.editor;
  }

  constructor() {
    this.amap = new SystemModuleRoadObjectDetailsAMapLineController();
    this.position =
      new SystemModuleRoadObjectDetailsMapLinePositionController();
    this.regist();
  }

  private amap: SystemModuleRoadObjectDetailsAMapLineController;
  public position: SystemModuleRoadObjectDetailsMapLinePositionController;

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

  map = {
    focus: (datas?: any) => {
      this.amap.focus(datas);
    },
    destroy: async () => {
      this.amap.destroy();
    },
  };

  load(datas: GisPoint[]) {
    return this.amap.load(datas);
  }
  clear() {
    return this.amap.clear();
  }
}
