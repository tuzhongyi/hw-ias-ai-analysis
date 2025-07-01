import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopsParams } from '../../../../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';

@Injectable()
export class SystemTaskRouteMapShopAnalysisBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  load(taskId: string) {
    let params = new GetShopsParams();
    params.TaskIds = [taskId];
    return this.service.shop.all(params);
  }
}
