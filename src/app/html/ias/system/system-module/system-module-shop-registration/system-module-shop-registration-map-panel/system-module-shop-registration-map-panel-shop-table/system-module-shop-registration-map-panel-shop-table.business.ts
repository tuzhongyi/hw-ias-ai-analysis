import { Injectable } from '@angular/core';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { PagedList } from '../../../../../../../common/data-core/models/page-list.model';

@Injectable()
export class SystemModuleShopRegistrationMapPanelShopTableBusiness {
  async load(index: number, size: number, datas: IShop[]) {
    let paged = PagedList.create<IShop | undefined>(datas, index, size);

    let count = paged.Page.PageSize - paged.Page.RecordCount;
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        paged.Data.push(undefined);
      }
    }

    return paged;
  }
}
