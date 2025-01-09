import { WindowViewModel } from '../../../../common/components/window-control/window.model';
import { ShopModel } from '../system-module-shop-table/system-module-shop-table.model';

export class SystemModuleShopManagerWindow {
  details = new DetailsWindow();
}

class DetailsWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  style = {
    width: '80%',
    height: '85%',
    paddingTop: '10px',
  };
  data?: ShopModel;
}
