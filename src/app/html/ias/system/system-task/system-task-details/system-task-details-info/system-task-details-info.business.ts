import { Injectable } from '@angular/core';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { SystemTaskDetailsInfoConverter } from './system-task-details-info.converter';

@Injectable()
export class SystemTaskDetailsInfoBusiness {
  constructor(private converter: SystemTaskDetailsInfoConverter) {}

  async load(data: AnalysisTask) {
    return this.converter.convert(data);
  }
}
