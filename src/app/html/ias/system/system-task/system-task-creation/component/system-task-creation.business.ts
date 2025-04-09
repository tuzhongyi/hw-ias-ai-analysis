import { Injectable } from '@angular/core';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { ArmAnalysisRequestService } from '../../../../../../common/data-core/requests/services/analysis/analysis.service';

@Injectable()
export class SystemTaskCreationBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  create(data: AnalysisTask) {
    data.CreationTime = new Date();
    return this.service.server.task.create(data);
  }
}
