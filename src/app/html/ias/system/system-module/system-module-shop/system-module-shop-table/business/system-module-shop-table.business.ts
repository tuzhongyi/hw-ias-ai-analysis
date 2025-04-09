import { Injectable } from '@angular/core';
import { PagedList } from '../../../../../../../common/data-core/models/page-list.model';

import {
  SystemModuleShopTableFilter,
  SystemModuleShopTableItem,
} from '../system-module-shop-table.model';
import { SystemModuleShopTableConverter } from './system-module-shop-table.converter';
import { SystemModuleShopTableService } from './system-module-shop-table.service';

@Injectable()
export class SystemModuleShopTableBusiness {
  constructor(
    private service: SystemModuleShopTableService,

    private converter: SystemModuleShopTableConverter
  ) {}

  async load(
    index: number,
    size: number,
    args: SystemModuleShopTableFilter,
    full = false
  ) {
    let datas = await this.service.load(index, size, args);
    if (
      datas.Page.RecordCount == 0 &&
      datas.Page.TotalRecordCount > 0 &&
      datas.Page.PageIndex > 1
    ) {
      datas = await this.service.load(datas.Page.RecordCount, size, args);
    }

    let paged = new PagedList<SystemModuleShopTableItem>();
    paged.Page = datas.Page;
    paged.Data = datas.Data.map((x, i) => {
      let model = this.converter.convert(x);
      model.index = paged.Page.PageSize * (paged.Page.PageIndex - 1) + i + 1;
      return model;
    });
    if (full) {
      let count = paged.Page.PageSize - paged.Page.RecordCount;
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          paged.Data.push(SystemModuleShopTableItem.create());
        }
      }
    }

    return paged;
  }
}
