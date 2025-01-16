import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopsParams } from '../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';

@Injectable()
export class SystemModuleShopCreationBusiness {
  constructor(private service: ArmAnalysisRequestService) {}
  async one() {
    let params = new GetShopsParams();
    params.PageSize = 1;
    params.PageIndex = 1;
    let paged = await this.service.shop.list(params);
    if (paged && paged.Data && paged.Data.length > 0) {
      return paged.Data[0];
    }
    return undefined;
  }
}
