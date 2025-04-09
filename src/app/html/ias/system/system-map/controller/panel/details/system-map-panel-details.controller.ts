import { Injectable } from '@angular/core';
import { SystemMapPanelDetailsShopRegistrationController } from './system-map-panel-details-shop-registration.controller';
import { SystemMapPanelDetailsShopController } from './system-map-panel-details-shop.controller';

@Injectable()
export class SystemMapPanelDetailsController {
  constructor(
    public shop: SystemMapPanelDetailsShopController,
    public registration: SystemMapPanelDetailsShopRegistrationController
  ) {}

  clear() {
    this.shop.clear();
  }
}
