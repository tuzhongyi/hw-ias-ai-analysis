import { WindowViewModel } from '../../../../../../../../common/components/window-control/window.model';
import { RoadSection } from '../../../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { SizeTool } from '../../../../../../../../common/tools/size-tool/size.tool';
import { SystemTaskRoadObjectManagerComponent } from '../../system-task-road-object-manager.component';

export class SystemTaskRoadObjectManagerDetailsSectionWindow extends WindowViewModel {
  constructor(that: SystemTaskRoadObjectManagerComponent) {
    super();
  }

  style = {
    ...SizeTool.window.video.path,
  };
  title = '屏蔽路段信息';

  data?: RoadSection;

  open(data?: RoadSection) {
    this.data = data;
    this.show = true;
  }

  on = {
    ok: (data: RoadSection) => {
      this.show = false;
    },
    cancel: () => {
      this.show = false;
    },
  };
}
