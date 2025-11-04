import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopSignsParams } from '../../../../../../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';

@Injectable()
export class SystemTaskRouteMapPanelDetailsShopAnalysisBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  load(taskId: string, shopId: string) {
    let params = new GetShopSignsParams();
    params.TaskIds = [taskId];
    params.ShopIds = [shopId];
    return this.service.shop.sign.all(params);
  }
}
