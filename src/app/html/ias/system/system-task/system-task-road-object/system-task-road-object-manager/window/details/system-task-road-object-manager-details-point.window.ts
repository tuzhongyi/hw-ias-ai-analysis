import { WindowViewModel } from '../../../../../../../../common/components/window-control/window.model';
import { RoadPoint } from '../../../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { SizeTool } from '../../../../../../../../common/tools/size-tool/size.tool';
import { SystemTaskRoadObjectManagerComponent } from '../../system-task-road-object-manager.component';

export class SystemTaskRoadObjectManagerDetailsPointWindow extends WindowViewModel {
  constructor(private that: SystemTaskRoadObjectManagerComponent) {
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
      this.show = false;
    },
    cancel: () => {
      this.show = false;
    },
  };
}
