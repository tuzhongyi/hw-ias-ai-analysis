import { Injectable } from '@angular/core';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { SystemEventManagerHandleBusiness } from './system-event-manager-handle.business';
import { SystemEventManagerShopBusiness } from './system-event-manager-shop.business';

@Injectable()
export class SystemEventManagerBusiness {
  constructor(
    public shop: SystemEventManagerShopBusiness,
    public handle: SystemEventManagerHandleBusiness,
    private service: ArmSystemRequestService
  ) {}
}
