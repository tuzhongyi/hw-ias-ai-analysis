import { Injectable } from '@angular/core';
import { IShop } from '../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { PagedList } from '../../../../../../common/data-core/models/page-list.model';
import {
  GeoDirection,
  GeoDirectionSort,
} from '../../../../../../common/tools/geo-tool/geo.model';
import { GeoTool } from '../../../../../../common/tools/geo-tool/geo.tool';
import { SystemMapSourceTableShopItem } from '../system-map-source-table-shop.model';
import { SystemMapSourceTableShopConverter } from './system-map-source-table-shop.converter';

@Injectable()
export class SystemMapSourceTableShopBusiness {
  constructor(private converter: SystemMapSourceTableShopConverter) {}

  async load(
    index: number,
    size: number,
    shops: IShop[],
    sort: GeoDirectionSort,
    direction: GeoDirection
  ) {
    let datas: SystemMapSourceTableShopItem[] = [];
    for (let i = 0; i < shops.length; i++) {
      let item = await this.converter.convert(shops[i]);
      datas.push(item);
    }
    datas = GeoTool.direction.sort(datas, sort, direction);
    let paged = PagedList.create(datas, index, size);

    for (let i = 0; i < paged.Data.length; i++) {
      paged.Data[i].index =
        paged.Page.PageSize * (paged.Page.PageIndex - 1) + i + 1;
    }

    let count = paged.Page.PageSize - paged.Page.RecordCount;
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        paged.Data.push(new SystemMapSourceTableShopItem());
      }
    }

    return paged;
  }
}
