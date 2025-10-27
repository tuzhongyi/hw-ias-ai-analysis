import { Injectable } from '@angular/core';
import { AnalysisGpsTask } from '../../../../../../common/data-core/models/arm/analysis/llm/analysis-gps-task.model';
import { ArmAnalysisRequestService } from '../../../../../../common/data-core/requests/services/analysis/analysis.service';

@Injectable()
export class SystemModuleGpsTaskManagerBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  async delete(ids: string[]) {
    let results: AnalysisGpsTask[] = [];
    for (let i = 0; i < ids.length; i++) {
      let result = await this.service.llm.gps.task.delete(ids[i]);
      results.push(result);
    }
    return results;
  }
}
