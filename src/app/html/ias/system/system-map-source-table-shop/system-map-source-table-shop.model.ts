import { ShopViewModel } from '../../../../common/view-models/shop/shop.view-model';

export class SystemMapSourceTableShopFilter {
  ids: string[] = [];
  asc?: string;
  desc?: string;
}

export class SystemMapSourceTableShopItem extends ShopViewModel {
  index = 0;
}
