import { Injectable } from '@angular/core';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { ShopConverter } from '../../../../common/view-models/shop/shop.converter';

@Injectable()
export class SystemMapSourceTableBusiness {
  constructor(private converter: ShopConverter) {}
  async load(datas: Shop[]) {
    return datas.map((data) => this.converter.convert(data));
  }
}
