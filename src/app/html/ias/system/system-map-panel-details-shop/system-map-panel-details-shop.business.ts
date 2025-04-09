import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetAnalysisTaskListParams } from '../../../../common/data-core/requests/services/analysis/server/analysis-server.params';

@Injectable()
export class SystemMapPanelDetailsShopBusiness {
  constructor(private service: ArmAnalysisRequestService) {}
  task(ids: string[]) {
    let params = new GetAnalysisTaskListParams();
    params.TaskIds = ids;
    return this.service.server.task.all(params);
  }
}
