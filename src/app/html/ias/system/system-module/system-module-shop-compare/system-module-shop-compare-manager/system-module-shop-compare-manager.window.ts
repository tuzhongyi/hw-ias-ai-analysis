import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { ShopTaskCompareResult } from '../../../../../../common/data-core/models/arm/analysis/shop-task-compare-result.model';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { HowellPoint } from '../../../../../../common/data-core/models/arm/point.model';
import { Page } from '../../../../../../common/data-core/models/page-list.model';
import { HtmlTool } from '../../../../../../common/tools/html-tool/html.tool';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';

export class SystemModuleShopCompareManagerWindow {
  setting = new SettingWindow();
  information = new InformationWindow();
  compare = new CompareWindow();
  picture = new PictureWindow();
  sign = new SignWindow();
  relate = new RelateWindow();

  get opened() {
    return (
      this.setting.show ||
      this.information.shop.show ||
      this.information.registration.show ||
      this.compare.info.show ||
      this.compare.picture.show ||
      this.sign.show ||
      this.relate.show
    );
  }
}

class SettingWindow extends WindowViewModel {
  style = {
    width: '435px',
    height: 'auto',
  };
}
class CompareWindow {
  page?: Page;
  info = new CompareInfoWindow();
  picture = new ComparePictureWindow();
}
class CompareInfoWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.middle,
  };
  data?: ShopTaskCompareResult;
}
class ComparePictureWindow extends WindowViewModel {
  style = {
    width: HtmlTool.screen.has.head.from.height(
      screen.availHeight * 0.75,
      16 / 9,
      60 + 12 + 20 + 30 + 15,
      (20 + 2) * 2
    ),
    height: `${screen.availHeight * 0.75}px`,
  };
  datas: string[] = [];
  index = 1;
  title = '';
}
class InformationWindow {
  shop = new InformationShopWindow();
  registration = new InformationShopRegistrationWindow();

  clear() {
    this.shop.clear();
    this.registration.clear();
  }
  close() {
    this.shop.show = false;
    this.registration.show = false;
  }
}
class InformationShopWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    ...SizeTool.window.large,
  };
  data?: Shop;
}
class InformationShopRegistrationWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    ...SizeTool.window.large,
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
    ...SizeTool.window.large,
  };
  title = '';
  id?: string;
  index = 0;
  page?: Page;
  polygon: HowellPoint[] = [];
}

class SignWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    ...SizeTool.window.video.path,
  };
  data?: Shop;
}
class RelateWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    ...SizeTool.window.large,
  };
  data?: Shop;
  title = '关联注册商铺';
}
