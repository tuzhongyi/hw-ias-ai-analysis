import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { RoadSection } from '../../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { SystemModuleRoadSectionManagerComponent } from '../system-module-road-section-manager.component';

export class SystemModuleRoadSectionManagerDetailsWindow extends WindowViewModel {
  constructor(private that: SystemModuleRoadSectionManagerComponent) {
    super();
  }

  style = {
    ...SizeTool.window.video.path,
  };
  title = '路段信息';

  data?: RoadSection;

  open(data?: RoadSection) {
    this.data = data;
    this.show = true;
  }

  on = {
    ok: (data: RoadSection) => {
      this.that.table.load.emit(this.that.table.args);
      this.show = false;
    },
    cancel: () => {
      this.show = false;
    },
  };
}
