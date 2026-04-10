import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { RoadPoint } from '../../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { SystemModuleRoadPointManagerComponent } from '../system-module-road-point-manager.component';

export class SystemModuleRoadPointManagerDetailsWindow extends WindowViewModel {
  constructor(private that: SystemModuleRoadPointManagerComponent) {
    super();
  }

  style = {
    ...SizeTool.window.video.path,
  };
  title = '道路屏蔽点信息';

  data?: RoadPoint;

  open(data?: RoadPoint) {
    this.data = data;
    this.show = true;
  }

  on = {
    ok: (data: RoadPoint) => {
      this.that.table.load.emit(this.that.table.args);
      this.show = false;
    },
    cancel: () => {
      this.show = false;
    },
  };
}
