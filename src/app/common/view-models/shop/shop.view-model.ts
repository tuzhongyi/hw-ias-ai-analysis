import { Exclude } from 'class-transformer';
import { AnalysisTask } from '../../data-core/models/arm/analysis/analysis-task.model';
import { ShopRegistration } from '../../data-core/models/arm/analysis/shop-registration.model';
import { IShop } from '../../data-core/models/arm/analysis/shop.interface';
import { Shop } from '../../data-core/models/arm/analysis/shop.model';

export interface IShopViewModel extends IShop {
  ObjectStateName?: Promise<string>;
  ShopTypeName?: Promise<string>;
  ConfidenceRatio?: string;
  Tasks?: Promise<AnalysisTask[]>;
}

export class ShopViewModel extends Shop implements IShopViewModel {
  @Exclude()
  ObjectStateName?: Promise<string>;
  @Exclude()
  ShopTypeName?: Promise<string>;
  @Exclude()
  ConfidenceRatio?: string;
  @Exclude()
  Tasks?: Promise<AnalysisTask[]>;
}
export class ShopRegistrationViewModel
  extends ShopRegistration
  implements IShopViewModel
{
  @Exclude()
  ObjectStateName?: Promise<string>;
  @Exclude()
  ShopTypeName?: Promise<string>;
}
