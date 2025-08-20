import { ShopSign } from '../../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { Paged } from '../../../../../../../common/data-core/models/page-list.model';
import { SystemMainManagerWindow } from '../../window/system-main-manager.window';

export class SystemMainManagerPanelDetails {
  show = false;

  constructor(private window: SystemMainManagerWindow) {}

  on = {
    picture: (item: Paged<ShopSign> | IShop) => {
      if (item instanceof Paged) {
        let data = item.Data;
        this.window.picture.id = data.ImageUrl;
        this.window.picture.title = data.Text ?? '';
        this.window.picture.polygon = data.Polygon ?? [];
        this.window.picture.page = item.Page;
        this.window.picture.show = true;
      } else {
        this.window.picture.id = item.ImageUrl;
        this.window.picture.title = item.Name ?? '';
        this.window.picture.polygon = [];
        this.window.picture.page = undefined;
        this.window.picture.show = true;
      }
    },
  };
}
