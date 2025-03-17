import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetAnalysisTaskListParams } from '../../../../../common/data-core/requests/services/analysis/server/analysis-server.params';
import { SystemMapTaskTableArgs } from './system-map-task-table.model';

@Injectable()
export class SystemMapTaskTableBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  load(args: SystemMapTaskTableArgs) {
    let params = new GetAnalysisTaskListParams();
    params.TaskStates = [2];
    if (args.name) {
      params.Name = args.name;
    }
    return this.service.server.task.all(params);
  }
}
