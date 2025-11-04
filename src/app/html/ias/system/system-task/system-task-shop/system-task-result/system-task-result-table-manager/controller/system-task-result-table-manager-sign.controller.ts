import { EventEmitter, Injectable } from '@angular/core';
import { ShopSign } from '../../../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { SystemTaskResultSignTableArgs } from '../../system-task-result-sign-table/system-task-result-sign-table.model';

@Injectable()
export class SystemTaskResultTableManagerSignController {
  select = new EventEmitter<ShopSign>();
  args = new SystemTaskResultSignTableArgs();
  toload = new EventEmitter<SystemTaskResultSignTableArgs>();
  selected?: ShopSign;
  onselect(data: ShopSign) {
    this.selected = data;
    this.select.emit(data);
  }
  load() {
    this.toload.emit(this.args);
  }
}
