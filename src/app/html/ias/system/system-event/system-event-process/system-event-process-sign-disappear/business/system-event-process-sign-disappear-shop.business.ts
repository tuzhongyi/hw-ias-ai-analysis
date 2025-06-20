import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { SystemEventProcessSignDisappearShopSignBusiness } from './system-event-process-sign-disappear-shop-sign.business';

@Injectable()
export class SystemEventProcessSignDisappearShopBusiness {
  constructor(
    private service: ArmAnalysisRequestService,
    public sign: SystemEventProcessSignDisappearShopSignBusiness
  ) {}

  get(shopId: string) {
    return this.service.shop.get(shopId);
  }
}
