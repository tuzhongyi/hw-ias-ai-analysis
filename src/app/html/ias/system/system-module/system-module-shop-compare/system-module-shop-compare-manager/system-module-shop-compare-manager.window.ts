import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { ShopTaskCompareResult } from '../../../../../../common/data-core/models/arm/analysis/shop-task-compare-result.model';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { Page } from '../../../../../../common/data-core/models/page-list.model';

export class SystemModuleShopCompareManagerWindow {
  setting = new SettingWindow();
  create = new CreateWindow();
  compare = new CompareWindow();
  picture = new PictureWindow();
  sign = new SignWindow();
}

class SettingWindow extends WindowViewModel {
  style = {
    width: '435px',
    height: 'auto',
    paddingTop: 0,
  };
}
class CompareWindow {
  page?: Page;
  info = new CompareInfoWindow();
  picture = new ComparePictureWindow();
}
class CompareInfoWindow extends WindowViewModel {
  style = {
    width: '56%',
    height: '80%',
    paddingTop: 0,
  };
  data?: ShopTaskCompareResult;
}
class ComparePictureWindow extends WindowViewModel {
  style = {
    width: '56%',
    height: '80%',
    paddingTop: 0,
  };
  datas: string[] = [];
  index = 1;
  title = '';
}
class CreateWindow {
  shop = new CreateShopWindow();
  registration = new CreateShopRegistrationWindow();

  clear() {
    this.shop.clear();
    this.registration.clear();
  }
  close() {
    this.shop.show = false;
    this.registration.show = false;
  }
}
class CreateShopWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    width: '70%',
    height: '80%',
    paddingTop: 0,
  };
  data?: Shop;
}
class CreateShopRegistrationWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    width: '70%',
    height: '80%',
    paddingTop: 0,
  };
  data?: ShopRegistration;
  get title() {
    if (this.input) {
      return '导入到注册商铺';
    } else {
      return '注册商铺详细信息';
    }
  }
  input = false;
}
class PictureWindow extends WindowViewModel {
  clear() {
    this.title = '';
    this.id = undefined;
    this.page = undefined;
  }
  style = {
    width: '60%',
    height: 'calc(60% + 60px)',
    paddingTop: 0,
  };
  title = '';
  id?: string;
  index = 0;
  page?: Page;
}

class SignWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    width: '80%',
    height: '85%',
    paddingTop: 0,
  };
  data?: Shop;
}
