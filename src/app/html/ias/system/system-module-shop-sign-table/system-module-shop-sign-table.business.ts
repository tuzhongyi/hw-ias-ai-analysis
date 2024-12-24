import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../common/data-core/requests/services/analysis/analysis.service';
import { MediumRequestService } from '../../../../common/data-core/requests/services/medium/medium.service';

@Injectable()
export class SystemModuleShopSignTableBusiness {
  constructor(
    private service: ArmAnalysisRequestService,
    private medium: MediumRequestService
  ) {}

  load(id: string) {
    return this.service.shop.sign.array(id);
  }

  picture(id: string) {
    return this.medium.picture(id);
  }
}
