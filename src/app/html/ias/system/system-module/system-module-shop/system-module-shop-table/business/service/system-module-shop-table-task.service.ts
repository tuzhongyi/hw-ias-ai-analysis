import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetAnalysisTaskListParams } from '../../../../../../../../common/data-core/requests/services/analysis/server/analysis-server.params';
import { SystemModuleShopTableFilter } from '../../system-module-shop-table.model';

@Injectable()
export class SystemModuleShopTableTaskService {
  constructor(private service: ArmAnalysisRequestService) {}

  load(args: SystemModuleShopTableFilter) {
    let params = new GetAnalysisTaskListParams();
    params.BeginTime = args.duration.begin;
    params.EndTime = args.duration.end;
    params.TaskStates = [2];
    params.TaskTypes = [101];
    return this.service.server.task.all();
  }
}
