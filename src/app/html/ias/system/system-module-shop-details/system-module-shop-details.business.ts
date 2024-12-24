import { Injectable } from '@angular/core';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { ArmAnalysisRequestService } from '../../../../common/data-core/requests/services/analysis/analysis.service';

@Injectable()
export class SystemModuleShopDetailsBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  update(data: Shop) {
    return this.service.shop.update(data);
  }
}
