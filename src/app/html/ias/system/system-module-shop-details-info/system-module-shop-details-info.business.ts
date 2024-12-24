import { Injectable } from '@angular/core';
import { ShopSign } from '../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { SystemModuleShopDetailsInfoConverter } from './system-module-shop-details-info.converter';

@Injectable()
export class SystemModuleShopDetailsInfoBusiness {
  constructor(private converter: SystemModuleShopDetailsInfoConverter) {}

  load(data: ShopSign) {
    let model = this.converter.convert(data);
    return model;
  }
}
