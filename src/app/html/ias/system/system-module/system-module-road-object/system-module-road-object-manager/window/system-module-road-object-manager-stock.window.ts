import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { SystemModuleRoadObjectManagerComponent } from '../system-module-road-object-manager.component';

export class SystemModuleRoadObjectManagerStockWindow extends WindowViewModel {
  constructor(private that: SystemModuleRoadObjectManagerComponent) {
    super();
  }

  style = {
    ...SizeTool.window.max,
  };

  title = '道路部件待入列表';

  open() {
    this.show = true;
  }
}
