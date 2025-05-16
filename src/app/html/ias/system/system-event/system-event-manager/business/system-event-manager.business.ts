import { Injectable } from '@angular/core';
import { SystemEventManagerHandleBusiness } from './system-event-manager-handle.business';
import { SystemEventManagerShopBusiness } from './system-event-manager-shop.business';

@Injectable()
export class SystemEventManagerBusiness {
  constructor(
    public shop: SystemEventManagerShopBusiness,
    public handle: SystemEventManagerHandleBusiness
  ) {}
}
