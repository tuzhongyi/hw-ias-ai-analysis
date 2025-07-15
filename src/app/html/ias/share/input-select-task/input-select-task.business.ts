import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetAnalysisTaskListParams } from '../../../../common/data-core/requests/services/analysis/server/analysis-server.params';

@Injectable()
export class InputSelectTaskBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  all() {
    let params = new GetAnalysisTaskListParams();
    params.Asc = 'Name';
    return this.service.server.task.all(params);
  }

  by = {
    name: (name: string) => {
      let params = new GetAnalysisTaskListParams();
      params.Name = name;
      params.Asc = 'Name';
      return this.service.server.task.all(params);
    },
    id: (id: string) => {
      let params = new GetAnalysisTaskListParams();
      params.TaskIds = [id];
      return this.service.server.task.all(params);
    },
  };
}
