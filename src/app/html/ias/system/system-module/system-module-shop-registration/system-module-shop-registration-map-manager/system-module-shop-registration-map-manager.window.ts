import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';

export class SystemModuleShopRegistrationMapManagerWindow {
  confirm = new ConfirmWindow();
}

class ConfirmWindow extends WindowViewModel {
  content = '';
  ok?: () => void;
}
