import { IShop } from '../../../../../common/data-core/models/arm/analysis/shop.interface';

export enum TaskCompareType {
  base,
  registration,
}

export interface SystemMapTaskShops {
  created: IShop[];
  existed: IShop[];
  disappeared: IShop[];
}
