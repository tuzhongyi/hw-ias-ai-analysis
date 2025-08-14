import { WindowViewModel } from '../../../../../common/components/window-control/window.model';
import { MobileDevice } from '../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { SizeTool } from '../../../../../common/tools/size-tool/size.tool';

export class ManagementDeviceMobileManagerWindow {
  confirm = new ConfirmWindow();
  information = new InformationWindow();
}
class InformationWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    ...SizeTool.window.large,
  };
  data?: MobileDevice;
  title = '注册商铺详细信息';
}
class ConfirmWindow extends WindowViewModel {
  get content() {
    return `是否删除选中的设备？`;
  }
}
