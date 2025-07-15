import { WindowViewModel } from '../../../../common/components/window-control/window.model';
import { FileInfo } from '../../../../common/data-core/models/arm/file/file-info.model';
import { SizeTool } from '../../../../common/tools/size-tool/size.tool';

export class ManagementRecordFileManagerWindow {
  details = new DetailsWindow();
}

class DetailsWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    ...SizeTool.window.video.path,
  };
  data?: FileInfo;
}
