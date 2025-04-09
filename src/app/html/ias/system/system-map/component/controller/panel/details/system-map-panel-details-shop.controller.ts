import { Injectable } from '@angular/core';
import { Shop } from '../../../../../../../../common/data-core/models/arm/analysis/shop.model';
import { SystemMapPanel } from '../../../system-map.model';
import { SystemMapPanelDetailsShopSignController } from './system-map-panel-details-shop-sign.controller';

@Injectable()
export class SystemMapPanelDetailsShopController extends SystemMapPanel {
  constructor(public sign: SystemMapPanelDetailsShopSignController) {
    super();
  }

  data?: Shop;

  clear() {
    this.data = undefined;
  }
  onsign() {
    this.sign.show = true;
  }
}
