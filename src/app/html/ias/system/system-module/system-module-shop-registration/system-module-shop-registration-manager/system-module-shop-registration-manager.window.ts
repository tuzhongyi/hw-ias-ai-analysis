import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { Page } from '../../../../../../common/data-core/models/page-list.model';

export class SystemModuleShopRegistrationManagerWindow {
  information = new InformationWindow();
  picture = new PictureWindow();
  confirm = new ConfirmWindow();
}
class InformationWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    width: '70%',
    height: '80%',
    paddingTop: 0,
  };
  data?: ShopRegistration;
  title = '注册商铺详细信息';
}
class PictureWindow extends WindowViewModel {
  clear() {
    this.id = undefined;
    this.title = '';
  }
  style = {
    width: '50%',
    height: 'auto',
    aspectRatio: '16/10.2',
    paddingTop: 0,
  };
  title = '';
  id?: string;
  page?: Page;
}
class ConfirmWindow extends WindowViewModel {
  get content() {
    return `是否删除选中的注册商铺？`;
  }
}
