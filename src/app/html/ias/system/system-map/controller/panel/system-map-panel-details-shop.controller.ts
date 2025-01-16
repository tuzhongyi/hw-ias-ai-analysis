import { Injectable } from '@angular/core';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { SystemMapPanel } from '../../system-map.model';

@Injectable()
export class SystemMapPanelDetailsShopController extends SystemMapPanel {
  data?: Shop;

  clear() {
    this.data = undefined;
  }
}
