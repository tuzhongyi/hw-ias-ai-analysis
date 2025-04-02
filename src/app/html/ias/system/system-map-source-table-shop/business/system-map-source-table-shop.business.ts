import { Injectable } from '@angular/core';
import { Shop } from '../../../../../common/data-core/models/arm/analysis/shop.model';
import {
  Page,
  PagedList,
} from '../../../../../common/data-core/models/page-list.model';
import { ArrayTool } from '../../../../../common/tools/array-tool/array.tool';
import {
  GeoDirection,
  GeoDirectionSort,
} from '../../../../../common/tools/geo-tool/geo.model';
import { GeoTool } from '../../../../../common/tools/geo-tool/geo.tool';
import { SystemMapSourceTableShopItem } from '../system-map-source-table-shop.model';
import { SystemMapSourceTableShopConverter } from './system-map-source-table-shop.converter';

@Injectable()
export class SystemMapSourceTableShopBusiness {
  constructor(private converter: SystemMapSourceTableShopConverter) {}
  async load(
    index: number,
    size: number,
    shops: Shop[],
    sort: GeoDirectionSort
  ) {
    let datas = [];
    for (let i = 0; i < shops.length; i++) {
      let item = await this.converter.convert(shops[i]);
      datas.push(item);
    }
    datas = this.sort(datas, sort);
    let paged = this.paged(datas, index, size);

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

  private sort(items: SystemMapSourceTableShopItem[], sort: GeoDirectionSort) {
    let group = ArrayTool.groupBy(items, (x) => {
      return x.Road?.Id ?? '';
    });

    let sorteds: SystemMapSourceTableShopItem[] = [];

    for (let key in group) {
      let items = group[key];
      let sorted = items.sort((a, b) => this.compare(a, b, sort));
      sorteds.push(...sorted);
    }

    return sorteds;
  }

  private compare(
    a: SystemMapSourceTableShopItem,
    b: SystemMapSourceTableShopItem,
    sort: GeoDirectionSort
  ) {
    if (a.Location && a.Road && b.Location && b.Road) {
      let _a: [number, number] = [a.Location.Longitude, a.Location.Latitude];
      let _b: [number, number] = [b.Location.Longitude, b.Location.Latitude];

      switch (a.Road.Direction) {
        case GeoDirection.ew:
          return GeoTool.point.sort.longitude(_a, _b, sort.lon);
        case GeoDirection.ns:
          return GeoTool.point.sort.latitude(_a, _b, sort.lat);
        default:
          throw new Error('Road.direction');
      }
    }
    return 0;
  }

  private paged<T>(datas: T[], index: number, size: number) {
    let page = new Page();
    page.PageIndex = index;
    page.PageSize = size;
    let count = datas.length;

    let start = (index - 1) * size;
    let onpage = datas.splice(start, size);

    page.PageCount = Math.ceil(count / size);
    page.RecordCount = onpage.length;
    page.TotalRecordCount = count;

    let paged = new PagedList<T>();
    paged.Page = page;
    paged.Data = onpage;
    return paged;
  }
}
