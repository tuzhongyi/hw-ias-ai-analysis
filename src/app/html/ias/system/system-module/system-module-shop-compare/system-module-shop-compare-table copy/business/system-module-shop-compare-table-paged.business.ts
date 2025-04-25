import { Injectable } from '@angular/core';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { PagedList } from '../../../../../../../common/data-core/models/page-list.model';
import { ShopConverter } from '../../../../../../../common/view-models/shop/shop.converter';

@Injectable()
export class SystemModuleShopCompareTablePagedBusiness {
  constructor(private converter: ShopConverter) {}

  async load(index: number, size: number, datas: IShop[]) {
    let paged = PagedList.create(datas, index, size);

    return paged;
  }
}
