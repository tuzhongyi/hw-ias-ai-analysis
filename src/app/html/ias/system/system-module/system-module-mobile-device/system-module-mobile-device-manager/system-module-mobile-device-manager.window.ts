import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { MobileDevice } from '../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';

export class SystemModuleMobileDeviceManagerWindow {
  details: DetailsWindow;

  constructor(language: LanguageTool) {
    this.details = new DetailsWindow(language);
  }
}

class DetailsWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.simple,
  };
  data?: MobileDevice;
  title = '';

  constructor(language: LanguageTool) {
    super();
    this.title = language.device.Name;
  }
}
