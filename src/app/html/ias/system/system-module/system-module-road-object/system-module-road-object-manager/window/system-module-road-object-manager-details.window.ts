import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { SystemModuleRoadObjectManagerComponent } from '../system-module-road-object-manager.component';

export class SystemModuleRoadObjectManagerDetailsWindow extends WindowViewModel {
  constructor(private that: SystemModuleRoadObjectManagerComponent) {
    super();
  }

  style = {
    ...SizeTool.window.large,
  };

  title = '道路物件详情';

  data?: RoadObject;

  open(data?: RoadObject) {
    this.data = data;
    this.show = true;
  }
}
