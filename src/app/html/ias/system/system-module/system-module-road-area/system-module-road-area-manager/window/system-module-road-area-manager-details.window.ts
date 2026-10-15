import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { RoadArea } from '../../../../../../../common/data-core/models/arm/geographic/road-area.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { SystemModuleRoadAreaManagerComponent } from '../system-module-road-area-manager.component';

export class SystemModuleRoadAreaManagerDetailsWindow extends WindowViewModel {
  constructor(private that: SystemModuleRoadAreaManagerComponent) {
    super();
  }

  style = {
    ...SizeTool.window.video.path,
  };
  title = '区域道路信息';

  data?: RoadArea;

  open(data?: RoadArea) {
    this.data = data;
    this.show = true;
  }

  on = {
    ok: (data: RoadArea) => {
      this.that.table.fit = true;
      this.that.table.load.emit(this.that.table.args);
      this.show = false;
    },
    cancel: () => {
      this.show = false;
    },
  };
}
