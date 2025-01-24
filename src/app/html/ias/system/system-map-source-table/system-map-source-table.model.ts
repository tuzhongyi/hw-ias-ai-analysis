import { ShopViewModel } from '../../../../common/view-models/shop/shop.view-model';

export class SystemMapSourceTableFilter {
  ids: string[] = [];
  asc?: string;
  desc?: string;
}

export class SystemMapSourceTableItem extends ShopViewModel {
  index = 0;
}
