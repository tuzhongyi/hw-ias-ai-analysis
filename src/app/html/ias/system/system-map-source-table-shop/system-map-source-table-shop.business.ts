import { Injectable } from '@angular/core';
import { PagedList } from '../../../../common/data-core/models/page-list.model';
import { ArmAnalysisRequestService } from '../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopsParams } from '../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';
import { ShopConverter } from '../../../../common/view-models/shop/shop.converter';
import {
  SystemMapSourceTableShopFilter,
  SystemMapSourceTableShopItem,
} from './system-map-source-table-shop.model';

@Injectable()
export class SystemMapSourceTableShopBusiness {
  constructor(
    private service: ArmAnalysisRequestService,
    private converter: ShopConverter
  ) {}
  async load(
    index: number,
    size: number,
    filter: SystemMapSourceTableShopFilter
  ) {
    let datas = await this.data(index, size, filter);
    let paged = new PagedList<SystemMapSourceTableShopItem>();
    paged.Page = datas.Page;
    paged.Data = datas.Data.map((x, i) => {
      let item = new SystemMapSourceTableShopItem();
      let model = this.converter.convert(x);
      item = Object.assign(item, model);
      item.index = paged.Page.PageSize * (paged.Page.PageIndex - 1) + i + 1;
      return item;
    });

    let count = paged.Page.PageSize - paged.Page.RecordCount;
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        paged.Data.push(new SystemMapSourceTableShopItem());
      }
    }

    return paged;
  }

  private async data(
    index: number,
    size: number,
    filter: SystemMapSourceTableShopFilter
  ) {
    if (filter.ids.length === 0) {
      let paged = new PagedList<SystemMapSourceTableShopItem>();
      paged.Data = [];
      paged.Page = {
        PageIndex: 1,
        PageSize: size,
        RecordCount: 0,
        PageCount: 0,
        TotalRecordCount: 0,
      };
      return paged;
    }
    let params = new GetShopsParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.Ids = filter.ids;
    params.Asc = filter.asc;
    params.Desc = filter.desc;
    return this.service.shop.list(params);
  }
}
