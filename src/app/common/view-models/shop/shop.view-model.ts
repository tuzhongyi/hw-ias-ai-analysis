import { Exclude } from 'class-transformer';
import { Shop } from '../../data-core/models/arm/analysis/shop.model';

export class ShopViewModel extends Shop {
  @Exclude()
  ObjectStateName?: Promise<string>;
  @Exclude()
  ShopTypeName?: Promise<string>;
  @Exclude()
  ConfidenceRatio?: string;
}
