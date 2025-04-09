import { EventEmitter, Injectable } from '@angular/core';
import { ShopSign } from '../../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { SystemMapPanel } from '../../../system-map.model';

@Injectable()
export class SystemMapPanelDetailsShopSignController extends SystemMapPanel {
  select = new EventEmitter<ShopSign>();

  data?: ShopSign;

  constructor() {
    super();
  }

  onselect(item: ShopSign) {
    this.data = item;
    this.select.emit(item);
  }
}
