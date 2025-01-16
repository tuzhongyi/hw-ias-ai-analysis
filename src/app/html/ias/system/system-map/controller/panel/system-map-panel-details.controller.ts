import { Injectable } from '@angular/core';
import { SystemMapPanelDetailsShopController } from './system-map-panel-details-shop.controller';

@Injectable()
export class SystemMapPanelDetailsController {
  constructor(public shop: SystemMapPanelDetailsShopController) {}

  clear() {
    this.shop.clear();
  }
}
