import { ArmAnalysisRequestService } from '../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetAnalysisGpsTaskSampleListParams } from '../../../../../../../common/data-core/requests/services/analysis/llm/analysis-llm.params';
import { Duration } from '../../../../../../../common/tools/date-time-tool/duration.model';

export class SystemMainManagerSampleeBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  load(duration: Duration) {
    let params = new GetAnalysisGpsTaskSampleListParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.IsAlarmRecord = true;
    return this.service.llm.gps.task.sample.all(params);
  }
}
