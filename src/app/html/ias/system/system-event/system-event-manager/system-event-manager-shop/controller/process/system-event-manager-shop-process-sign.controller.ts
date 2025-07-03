import { Injectable } from '@angular/core';
import { SystemEventManagerShopProcessSignDisappearController } from './system-event-manager-shop-process-sign-disappear.controller';
import { SystemEventManagerShopProcessSignDiscoverController } from './system-event-manager-shop-process-sign-discover.controller';

@Injectable()
export class SystemEventManagerShopProcessSignController {
  constructor(
    public discover: SystemEventManagerShopProcessSignDiscoverController,
    public disappear: SystemEventManagerShopProcessSignDisappearController
  ) {}
}
