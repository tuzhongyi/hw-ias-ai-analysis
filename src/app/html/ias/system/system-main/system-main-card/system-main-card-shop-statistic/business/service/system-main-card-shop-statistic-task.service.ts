import { TaskState } from '../../../../../../../../common/data-core/enums/analysis/task-state.enum';
import { ArmAnalysisRequestService } from '../../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import {
  GetAnalysisTaskListParams,
  GetShopTaskStatisticParams,
} from '../../../../../../../../common/data-core/requests/services/analysis/server/analysis-server.params';
import { Duration } from '../../../../../../../../common/tools/date-time-tool/duration.model';

export class SystemMainCardShopStatisticTaskService {
  constructor(private service: ArmAnalysisRequestService) {}

  load(duration: Duration) {
    let params = new GetAnalysisTaskListParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.TaskStates = [TaskState.Finished];
    params.TaskTypes = [101];
    params.Desc = 'CreationTime';
    return this.service.server.task.all(params);
  }

  statistic(taskIds: string[]) {
    let params = new GetShopTaskStatisticParams();
    params.TaskIds = taskIds;
    return this.service.server.task.shop.statistic(params);
  }
}
