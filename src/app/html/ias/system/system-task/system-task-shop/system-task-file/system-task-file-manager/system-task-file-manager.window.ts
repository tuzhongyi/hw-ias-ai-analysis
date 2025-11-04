import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { FileInfo } from '../../../../../../../common/data-core/models/arm/file/file-info.model';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';

export class SystemTaskFileManagerWindow {
  details = new DetailsWindow();
  multiple = new MultipleWindow();
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
class MultipleWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.full,
  };
  title = '';
}
