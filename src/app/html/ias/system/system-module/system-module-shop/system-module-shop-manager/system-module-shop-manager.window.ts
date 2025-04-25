import { WindowViewModel } from '../../../../../../common/components/window-control/window.model';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { Page } from '../../../../../../common/data-core/models/page-list.model';
import { ShopViewModel } from '../../../../../../common/view-models/shop/shop.view-model';

export class SystemModuleShopManagerWindow {
  details = new DetailsWindow();
  create = new CreateWindow();

  picture = new PictureWindow();
}

class DetailsWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    width: '80%',
    height: '85%',
    paddingTop: 0,
  };
  data?: ShopViewModel;
}
class CreateWindow extends WindowViewModel {
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
