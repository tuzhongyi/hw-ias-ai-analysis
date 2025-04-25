import { ShopObjectState } from '../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ShopTaskCompareResult } from '../../../../../../../common/data-core/models/arm/analysis/shop-task-compare-result.model';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';

export class SystemModuleShopCompareTableArgs {
  task = new SystemModuleShopCompareTableTaskArgs();
  states = [ShopObjectState.Created, ShopObjectState.Disappeared];
}

export class SystemModuleShopCompareTableTaskArgs {
  count?: number;
  duration: Duration = DateTimeTool.last.year(new Date());
}

export class SystemModuleShopCompareTableData {
  shop: IShop[] = [];
  result: ShopTaskCompareResult[] = [];
}
