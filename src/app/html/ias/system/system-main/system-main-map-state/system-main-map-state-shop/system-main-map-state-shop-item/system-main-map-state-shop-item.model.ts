import { ShopObjectState } from '../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';

export class SystemMainMapStateShopItem {
  name: string = '';
  value: number = 0;
  color = '';
  show = true;
  state = ShopObjectState.Existed;
}
