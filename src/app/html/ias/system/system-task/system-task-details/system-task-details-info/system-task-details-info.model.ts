import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';

export class SystemTaskDetailsInfo extends AnalysisTask {
  TaskTypeName!: Promise<string>;
  StateName!: Promise<string>;
}
