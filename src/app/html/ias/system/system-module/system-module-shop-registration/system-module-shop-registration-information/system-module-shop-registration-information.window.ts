import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';

export class SystemModuleShopRegistrationInformationWindow {
  subname = new SubnameWindow();
}

class SubnameWindow extends WindowViewModel {
  style = {
    width: '400px',
    height: 'auto',
  };
  title = '添加子名称';
}
