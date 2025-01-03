import { WindowViewModel } from '../../../../common/components/window-control/window.model';
import { FileInfo } from '../../../../common/data-core/models/arm/file/file-info.model';

export class SystemTaskFileManagerWindow {
  details = new DetailsWindow();
}

class DetailsWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    width: '80%',
    height: '70%',
    paddingTop: '10px',
  };
  data?: FileInfo;
}
