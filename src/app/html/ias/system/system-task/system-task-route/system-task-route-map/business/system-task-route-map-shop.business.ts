import { Injectable } from '@angular/core';
import { SystemTaskRouteMapShopRegistrationBusiness } from './system-task-route-map-shop-registration.business';

@Injectable()
export class SystemTaskRouteMapShopBusiness {
  constructor(
    public registration: SystemTaskRouteMapShopRegistrationBusiness
  ) {}
}
