import { Injectable } from '@angular/core';
import { SystemModuleShopDetailsInfoImageController } from './system-module-shop-details-info-image.controller';

@Injectable()
export class SystemModuleShopDetailsInfoController {
  constructor(public image: SystemModuleShopDetailsInfoImageController) {}
}
