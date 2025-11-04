import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopTaskStatisticParams } from '../../../../../../../../common/data-core/requests/services/analysis/server/analysis-server.params';

@Injectable()
export class SystemTaskRouteStatisticTaskBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  load(taskId: string) {
    let params = new GetShopTaskStatisticParams();
    params.TaskIds = [taskId];
    return this.service.server.task.shop.statistic(params);
  }
}
