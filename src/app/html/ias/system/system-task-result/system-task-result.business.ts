import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopSignsParams } from '../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';

@Injectable()
export class SystemTaskResultBusiness {
  constructor(private service: ArmAnalysisRequestService) {}
  statistic(taskId: string) {
    let params = new GetShopSignsParams();
    params.TaskIds = [taskId];
    return this.service.shop.sign.result.labels(params);
  }

  shop(id: string) {
    return this.service.shop.get(id);
  }
}
