import { Injectable } from '@angular/core';
import { SystemModuleShopRegistrationMapRoadBusiness } from './system-module-shop-registration-map-road.business';
import { SystemModuleShopRegistrationMapShopRegistrationBusiness } from './system-module-shop-registration-map-shop-registration.business';

@Injectable()
export class SystemModuleShopRegistrationMapBusiness {
  constructor(
    public road: SystemModuleShopRegistrationMapRoadBusiness,
    public registration: SystemModuleShopRegistrationMapShopRegistrationBusiness
  ) {}
}
