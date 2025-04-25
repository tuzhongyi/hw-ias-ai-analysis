import { Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { MediumRequestService } from '../../../../../../../common/data-core/requests/services/medium/medium.service';
import { ShopConverter } from '../../../../../../../common/view-models/shop/shop.converter';
import { SystemModuleShopCompareTableService } from './service/system-module-shop-compare-table.service';
import { SystemModuleShopCompareTablePagedBusiness } from './system-module-shop-compare-table-paged.business';
import {
  SystemModuleShopCompareTableArgs,
  SystemModuleShopCompareTableData,
} from './system-module-shop-compare-table.model';

@Injectable()
export class SystemModuleShopCompareTableBusiness {
  constructor(
    public medium: MediumRequestService,
    private service: SystemModuleShopCompareTableService,
    public paged: SystemModuleShopCompareTablePagedBusiness,
    private converter: ShopConverter
  ) {}

  count = {
    created: 0,
    existed: 0,
    disappeared: 0,
  };

  async load(args: SystemModuleShopCompareTableArgs) {
    let compared = await this.service.load(args);
    let data = new SystemModuleShopCompareTableData();
    this.count.created = 0;
    this.count.existed = 0;
    this.count.disappeared = 0;
    data.shop = compared.map((x) => {
      data.result.push(x);
      switch (x.ObjectState) {
        case ShopObjectState.Created:
          this.count.created++;
          if (x.Shop) {
            x.Shop.ObjectState = x.ObjectState;
            return x.Shop;
          }
          throw new Error('Shop is null');
        case ShopObjectState.Disappeared:
          this.count.disappeared++;
          if (x.ShopRegistration) {
            x.ShopRegistration.ObjectState = x.ObjectState;
            return x.ShopRegistration;
          }
          throw new Error('Shop is null');
        case ShopObjectState.Existed:
          this.count.existed++;
          if (x.ShopRegistration) {
            x.ShopRegistration.ObjectState = x.ObjectState;
          }
          if (x.Shop) {
            x.Shop.ObjectState = x.ObjectState;
            return x.Shop;
          }
          throw new Error('Shop is null');
        default:
          throw new Error('Unknown ObjectState');
      }
    });
    return data;
  }

  convert(shop: IShop) {
    return this.converter.convert(shop);
  }
}
