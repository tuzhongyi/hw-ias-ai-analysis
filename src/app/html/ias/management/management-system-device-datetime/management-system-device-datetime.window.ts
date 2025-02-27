import { WindowViewModel } from '../../../../common/components/window-control/window.model';

export class ManagementSystemDeviceDatetimeWindow {
  confirm = new ConfirmWindow();
}

class ConfirmWindow extends WindowViewModel {
  get content() {
    return `是否保存修改信息？`;
  }
}
