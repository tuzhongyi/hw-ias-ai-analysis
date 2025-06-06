import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';

export class SystemModuleShopRegistrationInformationWindow {
  subname = new SubnameWindow();
  business = new BusinessWindow();
}

class SubnameWindow extends WindowViewModel {
  style = {
    width: '400px',
    height: 'auto',
  };
  title = '添加子名称';
}
class BusinessWindow extends WindowViewModel {
  style = {
    width: '70%',
    height: 'auto',
  };
  title = '营业执照信息';
}
