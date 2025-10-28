import { Injectable } from '@angular/core';
import { AnalysisGpsTask } from '../../../../../../../common/data-core/models/arm/analysis/llm/analysis-gps-task.model';
import { ArmAnalysisRequestService } from '../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { MediumRequestService } from '../../../../../../../common/data-core/requests/services/medium/medium.service';
import { Guid } from '../../../../../../../common/tools/guid/guid';

@Injectable()
export class SystemModuleGpsTaskDetailsContainerBusiness {
  constructor(
    private medium: MediumRequestService,
    private analysis: ArmAnalysisRequestService
  ) {}

  async create(data: AnalysisGpsTask) {
    data.Id = Guid.NewGuid().ToString('N').toLocaleLowerCase();
    data.CreationTime = new Date();
    data.UpdateTime = new Date();

    return this.analysis.llm.gps.task.create(data);
  }

  update(data: AnalysisGpsTask) {
    data.UpdateTime = new Date();
    return this.analysis.llm.gps.task.update(data);
  }

  picture = {
    upload: async (data: ArrayBuffer) => {
      return this.medium.upload(data);
    },
  };
}
