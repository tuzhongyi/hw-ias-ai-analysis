import { RoadPoint } from '../../../../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { SystemTaskRoadObjectAMapPointCircleController } from './system-task-road-object-amap-point-circle.controller';
import { SystemTaskRoadObjectAMapPointLabelController } from './system-task-road-object-amap-point-label.controller';
import { SystemTaskRoadObjectAMapPointLayerController } from './system-task-road-object-amap-point-layer.controller';

export class SystemTaskRoadObjectAMapPointController {
  constructor(container: Loca.Container) {
    this.point = new SystemTaskRoadObjectAMapPointLayerController(container);
    this.circle = new SystemTaskRoadObjectAMapPointCircleController(container);
    this.label = new SystemTaskRoadObjectAMapPointLabelController(container);
  }

  private point: SystemTaskRoadObjectAMapPointLayerController;
  private circle: SystemTaskRoadObjectAMapPointCircleController;
  private label: SystemTaskRoadObjectAMapPointLabelController;

  load(datas: RoadPoint[]) {
    let geo = this.point.load(datas);
    if (geo) {
      this.circle.load(geo);
      // this.label.load(geo);
    }
  }
  clear() {
    this.point.clear();
    this.circle.clear();
  }
}
