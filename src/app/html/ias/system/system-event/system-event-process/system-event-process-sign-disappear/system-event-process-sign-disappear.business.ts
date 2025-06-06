import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemEventProcessSignDisappearBusiness {
  constructor(
    private service: ArmGeographicRequestService,
    private analysis: ArmAnalysisRequestService
  ) {}

  get(id: string) {
    return this.service.shop.get(id);
  }

  from = {
    shop: async (shopId: string) => {
      let shop = await this.analysis.shop.get(shopId);
      if (shop.RegistrationId) {
        return this.get(shop.RegistrationId);
      }
      return undefined;
    },
  };
}
