import { Injectable } from '@angular/core';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { ArmAnalysisRequestService } from '../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { AnalysisTaskSource } from '../../../../../../common/data-core/requests/services/analysis/server/analysis-server.params';

@Injectable()
export class SystemTaskManagerTaskBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  delete(id: string) {
    return this.service.server.task.delete(id);
  }

  source(task: AnalysisTask, files: string[]) {
    let source = new AnalysisTaskSource();
    source.SourceType = task.SourceType ?? 0;
    source.Files = files;
    return this.service.server.task.source(task.Id, source);
  }
}
