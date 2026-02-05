import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { FileInfo } from '../../../../../../../common/data-core/models/arm/file/file-info.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { SystemModuleRoadObjectManagerComponent } from '../system-module-road-object-manager.component';

export class SystemModuleRoadObjectManagerFileWindow extends WindowViewModel {
  constructor(private that: SystemModuleRoadObjectManagerComponent) {
    super();
  }

  style = {
    ...SizeTool.window.max,
  };

  title = '视频文件';

  folder?: FileInfo;

  open() {
    this.show = true;
  }
}
