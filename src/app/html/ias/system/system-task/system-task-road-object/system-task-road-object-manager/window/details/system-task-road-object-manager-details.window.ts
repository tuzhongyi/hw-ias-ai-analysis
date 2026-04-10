import { RoadObject } from '../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { RoadPoint } from '../../../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { RoadSection } from '../../../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { SystemTaskRoadObjectManagerComponent } from '../../system-task-road-object-manager.component';
import { SystemTaskRoadObjectManagerDetailsObjectWindow } from './system-task-road-object-manager-details-object.window';
import { SystemTaskRoadObjectManagerDetailsPointWindow } from './system-task-road-object-manager-details-point.window';
import { SystemTaskRoadObjectManagerDetailsSectionWindow } from './system-task-road-object-manager-details-section.window';

export class SystemTaskRoadObjectManagerDetailsWindow {
  object: SystemTaskRoadObjectManagerDetailsObjectWindow;
  point: SystemTaskRoadObjectManagerDetailsPointWindow;
  section: SystemTaskRoadObjectManagerDetailsSectionWindow;
  constructor(that: SystemTaskRoadObjectManagerComponent) {
    this.object = new SystemTaskRoadObjectManagerDetailsObjectWindow(that);
    this.point = new SystemTaskRoadObjectManagerDetailsPointWindow(that);
    this.section = new SystemTaskRoadObjectManagerDetailsSectionWindow(that);
  }

  open(data?: RoadObject | RoadPoint | RoadSection) {
    if (data instanceof RoadObject) {
      this.object.open(data);
    } else if (data instanceof RoadPoint) {
      this.point.open(data);
    } else if (data instanceof RoadSection) {
      this.section.open(data);
    }
  }
}
