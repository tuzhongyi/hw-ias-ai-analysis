import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetAnalysisTaskListParams } from '../../../../../../../../common/data-core/requests/services/analysis/server/analysis-server.params';

@Injectable()
export class SystemModuleShopCompareTableTaskService {
  constructor(private service: ArmAnalysisRequestService) {}

  count = 0;

  async load(taskcount: number) {
    let params = new GetAnalysisTaskListParams();
    params.Desc = 'CreationTime';
    params.PageIndex = 1;
    params.PageSize = taskcount;
    params.TaskStates = [2];
    let paged = await this.service.server.task.list(params);
    this.count = paged.Page.TotalRecordCount;
    return paged.Data;
  }
}
