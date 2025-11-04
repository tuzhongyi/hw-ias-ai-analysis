import { Injectable } from '@angular/core';
import { SystemTaskRouteMapShopAnalysisBusiness } from './system-task-route-map-shop-analysis.business';
import { SystemTaskRouteMapShopRegistrationBusiness } from './system-task-route-map-shop-registration.business';

@Injectable()
export class SystemTaskRouteMapShopBusiness {
  constructor(
    public registration: SystemTaskRouteMapShopRegistrationBusiness,
    public analysis: SystemTaskRouteMapShopAnalysisBusiness
  ) {}
}
