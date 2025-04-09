import { Road } from '../../../../../../common/data-core/models/arm/analysis/road.model';
import { RoadViewModel } from '../../../../../../common/view-models/road/road.view-model';
import { ShopViewModel } from '../../../../../../common/view-models/shop/shop.view-model';

export class SystemTaskResultShopTableArgs {
  taskId?: string;
  name?: string;
  channel?: string;
  type?: number = 1;
  label?: number;
  confidence = 0;
  road: Road[] = [];
}

export class SystemTaskResultShopTableFilter extends SystemTaskResultShopTableArgs {
  load(args: SystemTaskResultShopTableArgs) {
    Object.assign(this, args);
  }
}

export class SystemTaskResultShopTableItem extends ShopViewModel {
  Road?: RoadViewModel;
}
