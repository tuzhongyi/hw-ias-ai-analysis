import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { SystemModuleRoadObjectManagerComponent } from '../system-module-road-object-manager.component';

export class SystemModuleRoadObjectManagerDetailsWindow extends WindowViewModel {
  constructor(private that: SystemModuleRoadObjectManagerComponent) {
    super();
  }

  open(data?: RoadObject) {}
}
