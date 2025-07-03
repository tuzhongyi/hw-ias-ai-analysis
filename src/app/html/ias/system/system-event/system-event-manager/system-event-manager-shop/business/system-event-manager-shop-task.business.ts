import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetAnalysisTaskListParams } from '../../../../../../../common/data-core/requests/services/analysis/server/analysis-server.params';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';

@Injectable()
export class SystemEventManagerShopTaskBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  load(duration: Duration) {
    let params = new GetAnalysisTaskListParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.TaskStates = [2];
    params.TaskTypes = [101];
    return this.service.server.task.all(params);
  }
}
