import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { MobileDevice } from '../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';

export class SystemModuleMobileDeviceManagerWindow {
  details = new DetailsWindow();
}

class DetailsWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.simple,
  };
  data?: MobileDevice;
  title = '巡逻车辆';
}
