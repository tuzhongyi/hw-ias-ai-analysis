import { ShopObjectState } from '../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { Road } from '../../../../../../common/data-core/models/arm/geographic/road.model';

export class SystemMainManagerShopArgs {
  name?: string;
  road: RoadArgs = {};
  states? = [
    ShopObjectState.Created,
    ShopObjectState.Existed,
    ShopObjectState.Disappeared,
  ];
}

interface RoadArgs {
  on?: Road;
  ori?: Road;
}
