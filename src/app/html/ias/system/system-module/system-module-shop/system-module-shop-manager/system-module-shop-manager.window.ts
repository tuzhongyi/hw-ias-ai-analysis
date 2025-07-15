import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { Page } from '../../../../../../common/data-core/models/page-list.model';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';
import { ShopViewModel } from '../../../../../../common/view-models/shop/shop.view-model';

export class SystemModuleShopManagerWindow {
  details = new DetailsWindow();
  information = new InformationWindow();

  picture = new PictureWindow();
}

class DetailsWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    ...SizeTool.window.large,
  };
  data?: ShopViewModel;
}
class InformationWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    ...SizeTool.window.large,
  };
  data?: Shop;
}
class PictureWindow extends WindowViewModel {
  clear() {
    this.id = undefined;
    this.title = '';
  }
  style = {
    ...SizeTool.window.large,
  };
  title = '';
  id?: string;
  page?: Page;
}
