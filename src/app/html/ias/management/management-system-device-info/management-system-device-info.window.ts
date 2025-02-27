import { WindowViewModel } from '../../../../common/components/window-control/window.model';

export class ManagementSystemDeviceInfoWindow {
  confirm = new ConfirmWindow();
}

class ConfirmWindow extends WindowViewModel {
  get content() {
    return `是否保存设备信息？`;
  }
}
