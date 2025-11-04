import { Shop } from '../../../../../../../common/data-core/models/arm/analysis/shop.model';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { ShopStatisticStatus } from '../../system-task-route/system-task-route-statistic/system-task-route-statistic.model';

export interface ISystemTaskShopAnalysisTableArgs {
  taskId: string;
  name?: string;
  roadId?: string;
  status?: ShopStatisticStatus;
}
export class SystemTaskShopAnalysisTableArgs
  implements ISystemTaskShopAnalysisTableArgs
{
  taskId: string = '';
  name?: string;
  road: ISystemTaskShopAnalysisTableRoadArgs = {};
  status?: ShopStatisticStatus;
}
export interface ISystemTaskShopAnalysisTableItem {
  shop: Shop;
  registration?: ShopRegistration;
}
export class ISystemTaskShopAnalysisTableRoadArgs {
  on?: string;
  ori?: string;
}
