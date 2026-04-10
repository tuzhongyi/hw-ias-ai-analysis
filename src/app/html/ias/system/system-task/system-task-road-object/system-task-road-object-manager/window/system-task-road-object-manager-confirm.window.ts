import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { RoadPoint } from '../../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { RoadSection } from '../../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { SystemTaskRoadObjectManagerComponent } from '../system-task-road-object-manager.component';

export class SystemTaskRoadObjectManagerConfirmWindow extends WindowViewModel {
  constructor(that: SystemTaskRoadObjectManagerComponent) {
    super();
  }

  get content() {
    let type = '';
    if (this.data instanceof RoadObject) {
      type = '道路物件';
    } else if (this.data instanceof RoadPoint) {
      type = '道路屏蔽点';
    } else if (this.data instanceof RoadSection) {
      type = '屏蔽路段';
    }
    return `是否删除${type} ${this.data?.Name} ？`;
  }

  data?: RoadObject | RoadPoint | RoadSection;

  on = {
    ok: () => {},
    cancel: () => {},
  };
}
