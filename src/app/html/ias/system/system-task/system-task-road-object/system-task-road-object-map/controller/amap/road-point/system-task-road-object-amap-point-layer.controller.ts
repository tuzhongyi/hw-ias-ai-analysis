import { EventEmitter } from '@angular/core';
import { RoadPoint } from '../../../../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { ColorTool } from '../../../../../../../../../common/tools/color/color.tool';
import { IASMapAMapPointAbstract } from '../../../../../../../share/map/controller/amap/point/ias-map-amap-point.abstract';

export class SystemTaskRoadObjectAMapPointLayerController {
  event = {
    move: new EventEmitter<RoadPoint>(),
  };

  constructor(container: Loca.Container) {
    this.point = new SystemTaskRoadPointAMapPoint(container);
  }

  private point: SystemTaskRoadPointAMapPoint;

  load(datas: RoadPoint[]) {
    if (datas.length == 0) {
      this.clear();
      return;
    }

    return this.point.load(datas);
  }

  clear() {
    this.point.clear();
  }

  moving(position: [number, number], pixel = true) {
    this.point.moving(position, pixel);
  }
}

class SystemTaskRoadPointAMapPoint extends IASMapAMapPointAbstract {
  constructor(container: Loca.Container) {
    super(container);
  }
  protected get style() {
    return {
      radius: 5,
      unit: 'px',
      color: ColorTool.map.yellow,
      borderWidth: 0,
      blurWidth: 3,
    };
  }
}
