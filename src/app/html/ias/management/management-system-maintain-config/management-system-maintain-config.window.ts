import { WindowViewModel } from '../../../../common/components/window-control/window.model';

export class ManagementSystemMaintainConfigWindow {
  confirm = new ConfirmWindow();
}

class ConfirmWindow extends WindowViewModel {
  clear() {
    this.content = '';
    this.args = undefined;
    this.do = () => {};
  }

  content = '';

  args?: any;
  do: (args?: any) => void = () => {};
}
