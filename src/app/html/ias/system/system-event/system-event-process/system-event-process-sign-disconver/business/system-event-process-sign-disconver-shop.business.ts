import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { SystemEventProcessSignDisconverShopSignBusiness } from './system-event-process-sign-disconver-shop-sign.business';

@Injectable()
export class SystemEventProcessSignDisconverShopBusiness {
  constructor(
    private service: ArmAnalysisRequestService,
    public sign: SystemEventProcessSignDisconverShopSignBusiness
  ) {}

  get(shopId: string) {
    return this.service.shop.get(shopId);
  }
}
