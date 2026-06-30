import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { MobileDevice } from '../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';

export class SystemModuleMobileDeviceManagerWindow {
  details: DetailsWindow;

  constructor() {
    this.details = new DetailsWindow();
  }
}

class DetailsWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.simple,
  };
  data?: MobileDevice;
  title = '';

  constructor() {
    super();
    this.title = Language.DeviceName;
  }
}
