import { Injectable } from '@angular/core';
import { SystemMapPanelDetailsShopRegistrationController } from './system-map-panel-details-shop-registration.controller';
import { SystemMapPanelDetailsShopController } from './system-map-panel-details-shop.controller';

@Injectable()
export class SystemMapPanelDetailsController {
  constructor(
    public analysis: SystemMapPanelDetailsShopController,
    public registration: SystemMapPanelDetailsShopRegistrationController
  ) {}

  clear() {
    this.analysis.clear();
  }
}
