import { Exclude } from 'class-transformer';
import { ShopSign } from '../../data-core/models/arm/analysis/shop-sign.model';

export class ShopSignViewModel extends ShopSign {
  @Exclude()
  ObjectStateName?: Promise<string>;
  @Exclude()
  SignTypeName?: Promise<string>;
  @Exclude()
  ConfidenceRatio?: string;
  @Exclude()
  ResultLabelTypeName?: Promise<string>;
}
