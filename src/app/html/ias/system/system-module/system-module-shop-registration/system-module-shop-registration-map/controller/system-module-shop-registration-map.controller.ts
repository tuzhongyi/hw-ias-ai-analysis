import { Injectable } from '@angular/core';
import { SystemModuleShopRegistrationMapAMapController } from './amap/system-module-shop-registration-map-amap.controller';

@Injectable()
export class SystemModuleShopRegistrationMapController {
  constructor(public amap: SystemModuleShopRegistrationMapAMapController) {}
}
