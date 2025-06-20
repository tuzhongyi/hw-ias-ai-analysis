import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopSignsParams } from '../../../../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';

@Injectable()
export class SystemTaskShopAnalysisDetailsBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  load(shopId: string, taskId: string) {
    let params = new GetShopSignsParams();
    params.ShopIds = [shopId];
    params.TaskIds = [taskId];
    return this.service.shop.sign.all(params);
  }
}
