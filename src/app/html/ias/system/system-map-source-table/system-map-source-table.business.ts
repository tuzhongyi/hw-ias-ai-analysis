import { Injectable } from '@angular/core';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { SystemMapSourceTableConverter } from './system-map-source-table.converter';

@Injectable()
export class SystemMapSourceTableBusiness {
  constructor(private converter: SystemMapSourceTableConverter) {}
  load(datas: Shop[]) {
    return datas.map((data) => this.converter.convert(data));
  }
}
