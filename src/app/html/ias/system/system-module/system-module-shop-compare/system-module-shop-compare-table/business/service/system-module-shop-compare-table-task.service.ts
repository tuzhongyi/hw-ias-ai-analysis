import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetAnalysisTaskListParams } from '../../../../../../../../common/data-core/requests/services/analysis/server/analysis-server.params';
import { SystemModuleShopCompareTableTaskArgs } from '../system-module-shop-compare-table.model';

@Injectable()
export class SystemModuleShopCompareTableTaskService {
  constructor(private service: ArmAnalysisRequestService) {}

  async load(args: SystemModuleShopCompareTableTaskArgs) {
    let params = new GetAnalysisTaskListParams();
    params.Desc = 'CreationTime';
    params.PageIndex = 1;
    if (args.count) {
      params.PageSize = args.count;
    }
    params.TaskStates = [2];
    params.BeginTime = args.duration.begin;
    params.EndTime = args.duration.end;
    let paged = await this.service.server.task.list(params);
    return paged.Data;
  }
}
