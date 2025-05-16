import { Injectable } from '@angular/core';
import { SystemEventManagerShopAnalysisBusiness } from './system-event-manager-shop-analysis.business';
import { SystemEventManagerShopRegistrationBusiness } from './system-event-manager-shop-registration.business';

@Injectable()
export class SystemEventManagerShopBusiness {
  constructor(
    public analysis: SystemEventManagerShopAnalysisBusiness,
    public registration: SystemEventManagerShopRegistrationBusiness
  ) {}
}
