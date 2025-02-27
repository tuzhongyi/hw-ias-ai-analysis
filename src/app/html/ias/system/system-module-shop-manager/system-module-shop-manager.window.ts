import { WindowViewModel } from '../../../../common/components/window-control/window.model';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { ShopViewModel } from '../../../../common/view-models/shop/shop.view-model';

export class SystemModuleShopManagerWindow {
  details = new DetailsWindow();
  create = new CreateWindow();
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
