import { EventEmitter, Injectable } from '@angular/core';
import { Shop } from '../../../../../../../../common/data-core/models/arm/analysis/shop.model';
import { GeoDirectionSort } from '../../../../../../../../common/tools/geo-tool/geo.model';
import { SystemTaskResultShopTableArgs } from '../../system-task-result-shop-table/system-task-result-shop-table.model';
import { SystemTaskResultTableManagerSignController } from './system-task-result-table-manager-sign.controller';

@Injectable()
export class SystemTaskResultTableManagerShopController {
  constructor() {}

  sign = new SystemTaskResultTableManagerSignController();
  select = new EventEmitter<Shop>();
  args = new SystemTaskResultShopTableArgs();
  toload = new EventEmitter<SystemTaskResultShopTableArgs>();
  selected?: Shop;

  sort = new GeoDirectionSort();

  tosort = new EventEmitter<GeoDirectionSort>();

  async onselect(data: Shop) {
    this.selected = data;
    this.select.emit(data);
  }

  load() {
    this.toload.emit(this.args);
  }

  onsortchange(sort: GeoDirectionSort) {
    this.tosort.emit(sort);
  }
}
