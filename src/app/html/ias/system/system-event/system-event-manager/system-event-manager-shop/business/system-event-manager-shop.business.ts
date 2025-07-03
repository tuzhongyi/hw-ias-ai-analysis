import { Injectable } from '@angular/core';
import { SystemEventManagerShopAnalysisBusiness } from './system-event-manager-shop-analysis.business';
import { SystemEventManagerShopHandleBusiness } from './system-event-manager-shop-handle.business';
import { SystemEventManagerShopRegistrationBusiness } from './system-event-manager-shop-registration.business';
import { SystemEventManagerShopTaskBusiness } from './system-event-manager-shop-task.business';

@Injectable()
export class SystemEventManagerShopBusiness {
  constructor(
    public analysis: SystemEventManagerShopAnalysisBusiness,
    public registration: SystemEventManagerShopRegistrationBusiness,
    public handle: SystemEventManagerShopHandleBusiness,
    public task: SystemEventManagerShopTaskBusiness
  ) {}
}
